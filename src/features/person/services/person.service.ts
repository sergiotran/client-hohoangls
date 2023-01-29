import Person, { PersonModal } from '@/features/person/models/person';
import CreatePersonDto from '../dtos/create-person.dto';

export type FindAllPersonService = {
  data: PersonModal[];
  status: number;
  message?: string;
};
export const findAll = async (): Promise<FindAllPersonService> => {
  let data: PersonModal[] = [];
  let status = 200;
  let message: string | undefined = undefined;
  const persons = await Person.find();

  if (!persons) {
    status = 400;
    message = 'Có lỗi chưa xác định.';
  }

  if (!persons.length) {
    status = 404;
    message = 'Không tồn tại thành viên gia đình nào trong hệ thống';
  }

  data = persons;

  return { data, status, message };
};

export type CreatePersonService = {
  data: PersonModal;
  status: number;
  message?: string;
};
export const create = async (dto: CreatePersonDto): Promise<FindAllPersonService> => {
  let data: PersonModal[] = [];
  let status = 200;
  let message: string | undefined = undefined;
  const persons = await Person.create(dto);

  if (!persons) {
    status = 400;
    message = 'Có lỗi chưa xác định.';
  }
  data = persons;

  return { data, status, message };
};
