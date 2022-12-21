import PersonModel from '@/models/person';

class PersonController {
  async findAll() {
    try {
      const persons = await PersonModel.find({});
      return {
        status: 200,
        data: persons
      };
    } catch (error) {
      throw error as Error;
    }
  }
} 

export default PersonController;