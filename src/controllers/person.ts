import PersonModel, { Person } from '@/models/person';

class PersonController {
  async findAll() {
    try {
      const persons = await PersonModel.find({}).populate([
        'children',
        'brothers',
        'sisters',
        'wife',
        'husband',
        'father',
        'mother',
      ]);
      return {
        status: 200,
        data: persons,
      };
    } catch (error) {
      throw error as Error;
    }
  }

  async create(dto: Person) {
    try {
      const created = await PersonModel.create(dto);

      return {
        status: 200,
        data: created,
      };
    } catch (error) {
      throw error as Error;
    }
  }

  async update(id: string, dto: Person) {
    try {
      await PersonModel.findByIdAndUpdate(id, dto);
      const updatedCollection = await PersonModel.findById(id);

      return {
        status: 200,
        data: updatedCollection,
      };
    } catch (error) {
      throw error as Error;
    }
  }

  async updateAll(dto: Person[]) {
    console.log(dto);
    return true;
  }
}

export default PersonController;