import dbConnect from '@/utils/database';
import { createError } from '@/utils/error';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

const withDatabaseConnect = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler,
) => {
  try {
    await dbConnect();
    next();
  } catch (error) {
    throw createError(500, 'Database failed to connect');
  }
};

export default withDatabaseConnect;
