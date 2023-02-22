import { Schema, models, model, Types } from "mongoose";

const gender = ['male', 'female'] as const;

export type IPersonModel = {
  fullName: string;
  dob: string;
  dod: string;
  gender: typeof gender[number];
  family?: Types.ObjectId;
  sisters: Types.ObjectId[];
  brothers: Types.ObjectId[];
}

const PersonSchema = new Schema<IPersonModel>({
  fullName: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  dod: {
    type: String,
    required: false,
    default: null
  },
  gender: {
    type: String,
    required: true,
    enum: gender,
  },
  family: {
    type: Types.ObjectId,
    required: false,
    default: [] 
  },
  sisters: [{
    type: Types.ObjectId,
    required: false,
    default: [] 
  }],
  brothers: [{
    type: Types.ObjectId,
    required: false,
    default: [] 
  }],
});
const PersonModel = models.person || model('person', PersonSchema);

export default PersonModel;