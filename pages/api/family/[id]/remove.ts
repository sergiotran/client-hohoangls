import { NextApiHandler } from 'next';
import familyService from '@/features/family/family-service';
import HttpStatus from 'http-codes';
import dbConnect from '@/utils/database';
import createHttpError from 'http-errors';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'DELETE') {
    return res.status(HttpStatus.NOT_FOUND).json(createHttpError.NotFound());
  }
  await dbConnect();
  const id = req.query.id;
  const { status, data, ...response } = await familyService.remove(
    id as string,
  );

  res.status(HttpStatus.OK).json({
    data,
    status,
    ...(response.message
      ? {
          message: response.message,
        }
      : {}),
  });
};

export default handler;
