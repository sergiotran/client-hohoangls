import { NextApiRequest, NextApiResponse } from "next";
import { create } from '@/features/person/controllers/person.controller';
import dbConnect from '@/utils/database';
import CreatePersonDto from "@/features/person/dtos/create-person.dto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req;
  await dbConnect();
  if (method !== 'POST') {
    res.status(404).send('Route is not found');
  }
  await create(res, body as CreatePersonDto);
}