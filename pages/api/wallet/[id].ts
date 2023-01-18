import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/utils/prisma'

export default async function getWallet(
  req: NextApiRequest,
  res: NextApiResponse<Wallet | unknown>,
) {
  try {
    const { id } = req.query

    if (!id) {
      throw Error('Wallet id is missing')
    }

    const wallet = await prisma.wallet.findUnique({
      where: { id: Number(id) },
    })

    if (!wallet) {
      throw Error(`No wallet found with id ${id}`)
    }

    res.json(wallet)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: `${error}` })
  } finally {
    prisma.$disconnect()
  }
}
