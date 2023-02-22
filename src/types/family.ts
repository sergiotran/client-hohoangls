import { IFamilyModel } from "@/features/family/family-model";
import Person from "./person";

type Family = IFamilyModel & {
  wife: Person;
  husband: Person;
  childrens: Person[]
}

export default Family;