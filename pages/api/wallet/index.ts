import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/utils/prisma'

export default async function postWallet(
  req: NextApiRequest,
  res: NextApiResponse<unknown>,
) {
  try {
    if (req.method === 'POST') {
      const { name, currency, initialBalance } = req.body as WalletPostData

      const wallet = await prisma.wallet.create({
        data: {
          name,
          currency,
          balance: initialBalance,
          todayBalanceChange: initialBalance,
        },
      })

      res.json(wallet)
    } else {
      throw Error('Only POST method is allowed')
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: `${error}` })
  } finally {
    prisma.$disconnect()
  }
}
