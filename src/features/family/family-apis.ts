import client from '@/lib/axios-client';

class FamilyAPI {
  async findAll() {
    try {
      const { data, status } = await client.get('/family/list');

      return {
        data,
        status
      };
    } catch (error) {
      throw error as Error;
    }
  }
}

const familyAPI = new FamilyAPI();

export default familyAPI;
