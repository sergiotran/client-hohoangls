import { Schema, models, model, Types } from "mongoose";

export type IFamilyModel = {
  husband?: Types.ObjectId;
  wife?: Types.ObjectId;
  childrens: Types.ObjectId[];
}

const FamilySchema = new Schema<IFamilyModel>({
  husband: {
    type: Types.ObjectId,
    required: false,
    unique: true,
    ref: 'person'
  },
  wife: {
    type: Types.ObjectId,
    required: false,
    unique: true,
    ref: 'person'
  },
  childrens: [{
    type: Types.ObjectId,
    required: false,
    default: [],
    ref: 'person'
  }]
});
const FamilyModel = models.family || model('family', FamilySchema);

export default FamilyModel;