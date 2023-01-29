import { PersonModal } from "../models/person";

type CreatePersonDto = Omit<PersonModal, 'id' | '_id'>; 

export default CreatePersonDto;