import { Schema, model, models } from 'mongoose';
import { PersonModal } from '../../person/models/person';


export interface FamilyModal {
  _id: string;
  id: string;
  husband: Schema.Types.ObjectId | PersonModal | null;
  wife: Schema.Types.ObjectId | PersonModal | null;
  children: Schema.Types.ObjectId | null;
  parent: Schema.Types.ObjectId | PersonModal | null;
  parentId: Schema.Types.ObjectId | null;
  isRoot: boolean;
}

const familySchema = new Schema<FamilyModal>({
  husband: {
    type: Schema.Types.ObjectId,
    ref: 'person',
    required: false,
    default: null
  },
  wife: {
    type: Schema.Types.ObjectId,
    ref: 'person',
    required: false,
    default: null
  },
  children: {
    type: Schema.Types.ObjectId,
    ref: 'family',
    required: false,
    default: null
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'person',
    required: false,
    default: null
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'person',
    required: false,
    default: null
  },
  isRoot: {
    type: Boolean,
    required: false,
    default: true,
  }
}, {
  timestamps: true
});

familySchema.virtual('id').get(function () {
  return this._id.toString();
});

familySchema.set('toJSON', {
  virtuals: true,
});

export default models.family || model('family', familySchema);