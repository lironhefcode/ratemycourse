import { ObjectId, Schema } from "mongoose";
export type ReviewMoudle = {
  _id: ObjectId;
  courseId: ObjectId;
  byUser: string;
  rating: number;
  description: string;
  proofUrl: string;
  isVerified: boolean;
  createdAt: string;
};

export const reviewSchema = new Schema<ReviewMoudle>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "courses" },
    byUser: String,
    rating: Number,
    description: String,
    isVerified: Boolean,
    proofUrl: String,
    createdAt: String,
  },
  { versionKey: false }
);
