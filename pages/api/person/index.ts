import { findAll } from '@/features/person/controllers/person.controller';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  await dbConnect();
  if (method !== 'GET') {
    res.status(404).send('Route is not found');
  }
  await findAll(res);
}
