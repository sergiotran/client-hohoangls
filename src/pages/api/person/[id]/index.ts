import withDatabaseConnect from '@/middlewares/withDatabaseConnect';
import { createError, errorHandler } from '@/utils/error';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import * as personService from '@/features/person/person-service';
import { updatePersonDto } from '@/features/person/person-dto';

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: errorHandler,
});

handler.use(withDatabaseConnect);

handler.delete(async (req, res) => {
  const id = req.query.id as string;

  if (!id) {
    throw createError(
      404,
      'Please provide person id to param in able to delete data',
    );
  }

  const data = await personService.remove(id);

  res.status(200).json({
    status: 200,
    data,
  });
});

handler.put(async (req, res) => {
  const dto = req.body;
  const personId = req.query.id as string;

  if (!personId) {
    throw createError(
      404,
      'Please provide person id to param in able to update data',
    );
  }

  const data = await personService.update(personId, dto as updatePersonDto);

  res.status(200).json({
    status: 200,
    data,
  });
});

export default handler;
