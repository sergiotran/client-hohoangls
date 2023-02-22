import createHttpError from 'http-errors';
import FamilyModel from './family-model';
import HttpStatus from 'http-codes';
import Family from '@/types/family';

class FamilyAPIService {
  async findAll(page = 1, limits = 10) {
    try {
      const familyList = await FamilyModel.find({})
        .skip((page - 1) * limits)
        .limit(limits);

      return {
        status: HttpStatus.OK,
        data: familyList,
        message: null,
      };
    } catch (error) {
      return {
        ...createHttpError(HttpStatus.BAD_REQUEST, {
          message: (error as Error).message,
        }),
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findOne(id: string) {
    try {
      const family = await FamilyModel.findOne({
        _id: id,
      });

      return {
        status: HttpStatus.OK,
        data: family,
        message: null,
      };
    } catch (error) {
      return {
        ...createHttpError(HttpStatus.NOT_FOUND, {
          message: `Family with id: ${id} is not found.`,
        }),
        status: HttpStatus.NOT_FOUND,
      };
    }
  }

  async create(dto: Family) {
    try {
      const createFamily = await FamilyModel.create(dto);

      return {
        status: HttpStatus.CREATED,
        data: createFamily,
        message: null,
      };
    } catch (error) {
      console.log(error);
      return {
        ...createHttpError(HttpStatus.BAD_REQUEST, {
          message: (error as Error).message,
        }),
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async update(id: string, dto: Partial<Family>) {
    try {
      const updateFamily = await FamilyModel.findOneAndUpdate({ _id: id }, dto);

      return {
        status: HttpStatus.OK,
        data: updateFamily,
        message: null,
      };
    } catch (error) {
      return {
        ...createHttpError(HttpStatus.BAD_REQUEST, {
          message: (error as Error).message,
        }),
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async remove(id: string) {
    try {
      const removeFamily = await FamilyModel.findOneAndRemove({ _id: id });

      return {
        status: HttpStatus.OK,
        data: removeFamily,
        message: null,
      };
    } catch (error) {
      return {
        ...createHttpError(HttpStatus.BAD_REQUEST, {
          message: (error as Error).message,
        }),
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }
}

const service = new FamilyAPIService();
export default service;
