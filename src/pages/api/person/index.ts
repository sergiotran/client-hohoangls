import withDatabaseConnect from '@/middlewares/withDatabaseConnect';
import { errorHandler } from '@/utils/error';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import * as personService from '@/features/person/person-service';
import { createPersonDto } from '@/features/person/person-dto';

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: errorHandler,
});

handler.use(withDatabaseConnect);

handler.get(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1; // default to page 1 if not provided
  const limit = parseInt(req.query.limit as string) || 10; // default to 10 items per page if not provided
  const tree = !!req.query.tree;
  const data = await personService.findAll(page, limit, tree);

  res.status(200).json({
    status: 200,
    data,
  });
});

handler.post(async (req, res) => {
  const dto: createPersonDto = req.body;
  const data = await personService.create(dto);

  res.status(201).json({
    status: 201,
    data,
  });
});

export default handler;
