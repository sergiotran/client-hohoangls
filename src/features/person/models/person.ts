import { Schema, model, models } from 'mongoose';

export type Gender = 'male' | 'female';

export interface PersonModal {
  _id: string;
  id: string;
  name: string;
  date_of_birth: string;
  date_of_death: string;
  isDeath: boolean;
  gender: Gender;
  index: number;
  isMarried: boolean;
  family: Schema.Types.ObjectId; 
}

const personSchema = new Schema<PersonModal>({
  name: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: String,
    required: true
  },
  date_of_death: {
    type: String,
    required: false,
    default: null
  },
  gender: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: false,
    default: 0
  },
  family: {
    type: Schema.Types.ObjectId,
    ref: 'family',
    required: false,
    default: null,
  },
  isDeath: {
    type: Boolean,
    required: false,
    default: false,
  },
  isMarried: {
    type: Boolean,
    required: false,
    default: false,
  }
}, {
  timestamps: true
});

personSchema.virtual('id').get(function () {
  return this._id.toString();
});

personSchema.set('toJSON', {
  virtuals: true,
});

export default models.person || model('person', personSchema);