import CreatePersonDto from '../dtos/create-person.dto';
import {
  findAll as findAllService,
  FindAllPersonService,
  create as createService 
} from '../services/person.service';
import { NextApiResponse } from 'next';

// Find All
export const findAll = async (res: NextApiResponse) => {
  try {
    const response = await findAllService();
    res.status(response.status).json(response);
  } catch (error) {
    const { status } = error as FindAllPersonService;
    res.status(status || 400).json(error as FindAllPersonService);
  }
};

// Find All
export const create = async (res: NextApiResponse, dto: CreatePersonDto) => {
  try {
    const response = await createService(dto);
    res.status(response.status).json(response);
  } catch (error) {
    const { status } = error as FindAllPersonService;
    console.log(error);
    res.status(status || 400).json(error as FindAllPersonService);
  }
};
