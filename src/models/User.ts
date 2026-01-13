import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string; // this can represent the smart bin ID or label
}

const UserSchema: Schema<IUser> = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please provide an ID or name for this bin.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
    unique: true,
  },
});

const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema);

export default User;
