import type { NextApiRequest, NextApiResponse } from 'next';
import PersonController from '@/controllers/person';
import dbConnect from '@/utils/database';

const controller = new PersonController();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();
  switch (req.method) {
    case 'GET':
      controller
        .findAll()
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((error: Error) => res.status(400).json(error));
      break;
    case 'POST':
      controller
        .create(req.body)
        .then((data) => res.status(200).json(data))
        .catch((error: Error) => res.status(400).json(error));
      break;
    case 'PATCH':
      controller
        .update(req.body._id, req.body)
        .then((data) => res.status(200).json(data))
        .catch((error: Error) => res.status(400).json(error));
      break;
    default:
      res.status(404).json({
        status: 404,
        message: 'Endpoint is not found',
      });
  }
}
