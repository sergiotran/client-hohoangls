import axiosClient from "@/lib/axios-client";
import { IPerson } from "@/models/person";

type IGetPersonResponseFullFilled = {
  status: number;
  data: IPerson[]
}
export const getPersons = (): Promise<IPerson[]> => {
  return new Promise((resolve, reject) => {
    axiosClient.get<IGetPersonResponseFullFilled>('/api/person').then((res) => {
      resolve(res.data.data);
    }).catch((reason) => reject(reason));
  });
};

type ICreatePersonReponseFullFilled = {
  status: number;
  data: IPerson
}
export const createPerson = (dto: Omit<IPerson, '_id'>): Promise<IPerson> => {
  return new Promise((resolve, reject) => {
    axiosClient.post<ICreatePersonReponseFullFilled>('/api/person', dto).then((res) => {
      resolve(res.data.data);
    }).catch((reason) => reject(reason));
  });
};

type IUpdatePersonReponseFullFilled = {
  status: number;
  data: IPerson
}
export const updatePerson = (dto: Partial<IPerson>): Promise<IPerson> => {
  return new Promise((resolve, reject) => {
    axiosClient.patch<IUpdatePersonReponseFullFilled>('/api/person', dto).then((res) => {
      resolve(res.data.data);
    }).catch((reason) => reject(reason));
  });
};

type IUpdateListPersonReponseFullFilled = {
  status: number;
  data: IPerson[]
}
export const updateListPerson = (dto: IPerson[]): Promise<IPerson[]> => {
  return new Promise((resolve, reject) => {
    axiosClient.put<IUpdateListPersonReponseFullFilled>('/api/person', dto).then((res) => {
      resolve(res.data.data);
    }).catch((reason) => reject(reason));
  });
};