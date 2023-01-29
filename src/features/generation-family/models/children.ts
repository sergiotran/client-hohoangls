import { Schema, model, models } from 'mongoose';
import { PersonModal } from '../../person/models/person';

export interface ChildrenModal {
  _id: string;
  id: string;
  sisters: Schema.Types.ObjectId[] | PersonModal | null;
  brothers: Schema.Types.ObjectId[] | PersonModal | null;
  familyId: Schema.Types.ObjectId;
}

const familySchema = new Schema<ChildrenModal>({
  brothers: [{
    type: Schema.Types.ObjectId,
    ref: 'person',
  }],
  sisters: [{
    type: Schema.Types.ObjectId,
    ref: 'person',
  }],
  familyId: {
    type: Schema.Types.ObjectId,
    ref: 'family',
    required: true,
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

export default models.children || model('children', familySchema);