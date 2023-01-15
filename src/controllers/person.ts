import PersonModel, { IPerson, Person } from '@/models/person';
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
    try {
      const updateList = async (list: Person[]) => {
        if (!list || !list.length) {
          return;
        }
        for (let i = 0; i < list.length; i++) {
          await this.update((list[i] as IPerson)._id, list[i]);
          if (list[i].children) {
            updateList(list[i].children as unknown as Person[]);
          }
        }
      };
      await updateList(dto);
      const list = await this.findAll();
      return {
        status: 200,
        data: list.data,
      };
    } catch (error) {
      throw error as Error;
    }
  }
}

export default PersonController;