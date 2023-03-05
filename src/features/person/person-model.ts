import { model, models, Schema } from 'mongoose';
import type { Document, Model } from 'mongoose';
import { genders } from './person-constant';

interface IPerson {
  name: string;
  gender: (typeof genders)[number];
  birthDate: Date;
  isDeceased: boolean;
  deceasedDate: Date | null;
  siblings: Array<string | IPerson>;
  children: Array<string | IPerson>;
  spouse: string | IPerson | null;
  father: string | IPerson | null;
  mother: string | IPerson | null;
}

interface IPersonDocument extends IPerson, Document {}
type IPersonModel = Model<IPersonDocument>;

const PersonSchema = new Schema<IPersonDocument, IPersonModel>(
  {
    name: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: genders,
      required: true,
    },
    deceasedDate: {
      type: Date,
      required: false,
      default: null,
    },
    isDeceased: {
      type: Boolean,
      required: false,
      default: false,
    },
    siblings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'person',
        required: false,
        default: [],
      },
    ],
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: 'person',
        required: false,
        default: [],
      },
    ],
    spouse: {
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

PersonSchema.pre('findOne', function (next) {
  console.log('hehe');
  this.populate([
    {
      path: 'children',
      model: PersonModel,
    },
  ]);
  next();
}).pre('find', function (next) {
  this.populate([
    {
      path: 'children',
      model: PersonModel,
    },
  ]);
  next();
});

const PersonModel: IPersonModel =
  models.person || model('person', PersonSchema);

export { PersonSchema };
export type { IPersonDocument, IPersonModel, IPerson };
export default PersonModel;
