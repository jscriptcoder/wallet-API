import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/utils/prisma'

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

    const [fromWallet, toWallet] = await Promise.all([
      prisma.wallet.findFirst({ where: { id: from, currency } }),
      prisma.wallet.findFirst({ where: { id: to, currency } }),
    ])

    const balanceFrom = Number(fromWallet?.balance)
    const todayBalanceChangeFrom = Number(fromWallet?.todayBalanceChange)
    const balanceTo = Number(toWallet?.balance)
    const todayBalanceChangeTo = Number(toWallet?.todayBalanceChange)

    // Make sure from wallet has sufficient funds to perform the transaction
    if (balanceFrom < amount) {
      throw Error(`Wallet with id ${fromWallet?.id} has inssuficient funds`)
    }

    const newBalanceTo = balanceTo + amount
    const newBalanceFrom = balanceFrom - amount
    const newTodayBalanceChangeFrom = todayBalanceChangeFrom - amount
    const newTodayBalanceChangeTo = todayBalanceChangeTo + amount

    const newWalletTo = await prisma.wallet.update({
      data: {
        balance: newBalanceTo,
        todayBalanceChange: newTodayBalanceChangeTo,
      },
      where: { id: to },
    })

    const newWalletFrom = await prisma.wallet.update({
      data: {
        balance: newBalanceFrom,
        todayBalanceChange: newTodayBalanceChangeFrom,
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
