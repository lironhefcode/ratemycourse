import { Document, ObjectId, Schema } from "mongoose";
export interface Course {
  _id: ObjectId;
  title: string;
  description: string;
  courseCreator: string;
  price: number;
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
    price: Number,
    category: String,
    reviewAvg: Number,
    reviewCount: Number,
    imgUrl: String,
  },
  { versionKey: false }
);
