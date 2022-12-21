import { Schema, models, model } from 'mongoose';

type Person = {
  name: string;
  date_of_birth: string;
  date_of_death: string | null;
  childrens: Schema.Types.ObjectId[] | null;
  sisters: Schema.Types.ObjectId[] | null;
  brothers: Schema.Types.ObjectId[] | null;
  wife: Schema.Types.ObjectId | null;
  husband: Schema.Types.ObjectId | null;
  father: Schema.Types.ObjectId | null;
  mother: Schema.Types.ObjectId | null;
};

const PersonSchema = new Schema<Person>(
  {
    name: { type: String, required: true },
    date_of_birth: { type: String, required: true },
    date_of_death: { type: String, required: false, default: null },
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