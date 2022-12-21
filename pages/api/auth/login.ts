import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    res.status(200).json({
      status: 200,
      message: 'Hello auth api',
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: (error as Error).message,
    });
  }
}
