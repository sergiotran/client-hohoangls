import { NextApiHandler } from 'next';
import familyService from '@/features/family/family-service';
import HttpStatus from 'http-codes';
import dbConnect from '@/utils/database';
import createHttpError from 'http-errors';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'PATCH') {
    return res.status(HttpStatus.NOT_FOUND).json(createHttpError.NotFound());
  }
  await dbConnect();
  const id = req.query.id;
  const updateDto = req.body;
  const { status, data, ...response } = await familyService.update(
    id as string,
    updateDto,
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
