import { genders } from "./person-constant";

export interface createPersonDto {
  name: string;
  gender: typeof genders[number];
  birthDate: Date;
  isDeceased?: boolean;
  deceasedDate?: Date;
  siblings?: Array<string>;
  spouse?: string;
  father?: string;
  mother?: string;
  children?: Array<string>;
}


export interface updatePersonDto {
  name?: string;
  gender?: typeof genders[number];
  birthDate?: Date;
  isDeceased?: boolean;
  deceasedDate?: Date;
  siblings?: Array<string>;
  spouse?: string;
  father?: string;
  mother?: string;
  children?: Array<string>;
}