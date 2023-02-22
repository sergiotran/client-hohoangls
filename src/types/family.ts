import { IFamilyModel } from "@/models/family";
import Person from "./person";

type Family = IFamilyModel & {
  wife: Person;
  husband: Person;
  childrens: Person[]
}

export default Family;