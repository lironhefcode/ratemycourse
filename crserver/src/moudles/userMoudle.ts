import { ObjectId, Schema } from "mongoose";

export type userInfo = {
  userName: string;
  email: string;
  isAdmin: boolean;
  _id: ObjectId;
};

export const userSchema = new Schema<userInfo>(
  {
    userName: String,
    email: String,
    isAdmin: Boolean,
  },
  { versionKey: false }
);
