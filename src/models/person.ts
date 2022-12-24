import { Schema, models, model } from 'mongoose';

export type Person = {
  name: string;
  date_of_birth: string;
  date_of_death?: string;
  gender: 'male' | 'female'; 
  childrens?: Schema.Types.ObjectId[];
  sisters?: Schema.Types.ObjectId[];
  brothers?: Schema.Types.ObjectId[];
  wife?: Schema.Types.ObjectId;
  husband?: Schema.Types.ObjectId;
  father?: Schema.Types.ObjectId;
  mother?: Schema.Types.ObjectId;
};

export type IPerson = Omit<
  Person,
  | 'childrens'
  | 'sisters'
  | 'brothers'
  | 'wife'
  | 'husband'
  | 'father'
  | 'mother'
> & {
  _id: string;
  childrens?: IPerson[];
  sisters?: IPerson[];
  brothers?: IPerson[];
  wife?: IPerson;
  husband?: IPerson;
  father?: IPerson;
  mother?: IPerson;
};

const PersonSchema = new Schema<Person>(
  {
    name: { type: String, required: true },
    date_of_birth: { type: String, required: true },
    date_of_death: { type: String, required: false, default: null },
    gender: {type: String, required: true},
    childrens: [
      {
        type: Schema.Types.ObjectId,
        ref: 'person',
        required: false,
        default: [],
      },
    ],
    sisters: [
      {
        type: Schema.Types.ObjectId,
        ref: 'person',
        required: false,
        default: [],
      },
    ],
    brothers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'person',
        required: false,
        default: [],
      },
    ],
    wife: {
      type: Schema.Types.ObjectId,
      ref: 'person',
      required: false,
      default: null,
    },
    husband: {
      type: Schema.Types.ObjectId,
      ref: 'person',
      required: false,
      default: null,
    },
    father: {
      type: Schema.Types.ObjectId,
      ref: 'person',
      required: false,
      default: null,
    },
    mother: {
      type: Schema.Types.ObjectId,
      ref: 'person',
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const PersonModel = models.person || model('person', PersonSchema);

export default PersonModel;