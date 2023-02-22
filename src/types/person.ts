import { IPersonModel } from "@/models/person";

type Person = IPersonModel & {
  family?: Person;
  sisters: Person[];
  brothers: Person[];
}

export default Person;