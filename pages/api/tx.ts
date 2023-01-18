import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/utils/prisma'

export default async function postTx(
  req: NextApiRequest,
  res: NextApiResponse<unknown>,
) {
  try {
    if (req.method === 'POST') {
      res.status(200).json('{ data: "wallet" }')
    } else {
      throw Error('Wrong method: only POST is allowed')
    }
  } catch (error) {
    res.status(500).json({ error })
  } finally {
    prisma.$disconnect()
  }
}
