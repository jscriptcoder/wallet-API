import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/utils/prisma'

export default async function postWallet(
  req: NextApiRequest,
  res: NextApiResponse<unknown>,
) {
  try {
    if (req.method !== 'POST') {
      throw Error('Only POST method is allowed')
    }

    const {
      name,
      currency = 'ETH',
      initialBalance = 0,
    } = JSON.parse(req.body) as WalletPostData

    const wallet = await prisma.wallet.create({
      data: {
        name,
        currency,
        balance: initialBalance,
      },
    })

    res.json(wallet)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: `${error}` })
  } finally {
    prisma.$disconnect()
  }
}
