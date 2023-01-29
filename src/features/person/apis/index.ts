import axiosClient from '@/lib/axios-client';
import { PersonModal } from '../models/person';
import CreatePersonDto from '../dtos/create-person.dto';

type FindAllPersonResponse = {
  data: PersonModal[];
  status: number;
};
export const findAll = async () => {
  try {
    const res = await axiosClient.get<FindAllPersonResponse>('/api/person');
    return res.data;
  } catch (error) {
    throw error as Error;
  }
};

type CreatePersonResponse = {
  data: PersonModal;
  status: number;
};
export const create = async (dto: CreatePersonDto) => {
  try {
    const res = await axiosClient.post<CreatePersonResponse>(
      '/api/person/create',
      dto,
    );
    return res.data;
  } catch (error) {
    throw error as Error;
  }
};
