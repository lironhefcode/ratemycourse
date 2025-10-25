import { Document, ObjectId, Schema } from "mongoose";
export interface Course {
  _id: ObjectId;
  title: string;
  description: string;
  courseCreator: string;
  category: string;
  reviewCount: number;
  reviewAvg: number;
  imgUrl: string;
}
export const courseSchema = new Schema<Course>(
  {
    title: String,
    description: String,
    courseCreator: String,
    category: String,
    reviewAvg: Number,
    reviewCount: Number,
    imgUrl: String,
  },
  { versionKey: false }
);
