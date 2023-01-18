import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/utils/prisma'
import { isToday } from '@/utils/date'

export default async function postTx(
  req: NextApiRequest,
  res: NextApiResponse<unknown>,
) {
  try {
    if (req.method !== 'POST') {
      throw Error('Only POST method is allowed')
    }

    const {
      from,
      to,
      amount,
      currency = 'ETH',
    } = JSON.parse(req.body) as TxPostData

    // Step 1: get the wallets involved in the transaction
    const [fromWallet, toWallet] = await Promise.all([
      prisma.wallet.findFirst({ where: { id: from, currency } }),
      prisma.wallet.findFirst({ where: { id: to, currency } }),
    ])

    // Step 2: make sure from wallet has sufficient funds to perform the transaction
    const balanceFrom = Number(fromWallet?.balance)
    if (balanceFrom < amount) {
      throw Error(`Wallet with id ${fromWallet?.id} has inssuficient funds`)
    }

    const balanceTo = Number(toWallet?.balance)

    // Step 3: reset todayBalanceChange if last update is not today
    const todayBalanceChangeFrom = isToday(fromWallet?.updatedAt)
      ? Number(fromWallet?.todayBalanceChange)
      : 0

    const todayBalanceChangeTo = isToday(toWallet?.updatedAt)
      ? Number(toWallet?.todayBalanceChange)
      : 0

    // Sterp 4: update balances
    const newBalanceTo = balanceTo + amount
    const newBalanceFrom = balanceFrom - amount
    const newTodayBalanceChangeFrom = todayBalanceChangeFrom - amount
    const newTodayBalanceChangeTo = todayBalanceChangeTo + amount

    const newWalletTo = await prisma.wallet.update({
      data: {
        balance: newBalanceTo,
        todayBalanceChange: newTodayBalanceChangeTo,
        updatedAt: new Date().toISOString(),
      },
      where: { id: to },
    })

    const newWalletFrom = await prisma.wallet.update({
      data: {
        balance: newBalanceFrom,
        todayBalanceChange: newTodayBalanceChangeFrom,
        updatedAt: new Date().toISOString(),
      },
      where: { id: from },
    })

    res.json({ updatedWallets: [newWalletFrom, newWalletTo] })
  } catch (error) {
    res.status(500).json({ error: `${error}` })
  } finally {
    prisma.$disconnect()
  }
}
