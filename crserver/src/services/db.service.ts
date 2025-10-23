import { connect, model } from "mongoose";
import { courseSchema } from "../moudles/couresMoudle";
import { reviewSchema } from "../moudles/reviewMoudle";
import { userSchema } from "../moudles/userMoudle";
export const Courses = model("courses", courseSchema);
export const Reviews = model("reviews", reviewSchema);
export const Users = model("users", userSchema);
export async function connectDB() {
  await connect(
    `mongodb+srv:${process.env.DB_NAME}//:${process.env.DB_PASSWORD}${process.env.DB_URL}`
  );
}
