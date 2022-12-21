import { Schema, models, model } from 'mongoose';

type User = {
  username: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = models.user || model('user', UserSchema);

export default UserModel;

