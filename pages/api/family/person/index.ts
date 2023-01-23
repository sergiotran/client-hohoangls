import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  await dbConnect();
  res.status(200).send(method);
}
