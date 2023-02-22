import { IPersonModel } from "@/features/person/person-model";

type Person = IPersonModel & {
  family?: Person;
  sisters: Person[];
  brothers: Person[];
}

export default Person;