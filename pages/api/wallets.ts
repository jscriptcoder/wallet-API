import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/utils/prisma'

export default async function getWallets(
  req: NextApiRequest,
  res: NextApiResponse<unknown>,
) {
  try {
    const wallets = await prisma.wallet.findMany({
      orderBy: { createdAt: 'desc' },
    })

    res.json({ wallets })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: `${error}` } as ErrorData)
  } finally {
    prisma.$disconnect()
  }
}
