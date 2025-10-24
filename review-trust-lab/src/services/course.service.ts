import { Course } from "@/data/mockData";
import axios from "axios";
import url from "./serverHelper";
import { addCourseForm } from "@/components/AddCourseForm";
import { upload } from "./uploadService";

export const courseServices = {
  async load(): Promise<Course[]> {
    const { data: courses } = await axios.get(`${url}/courses`);
    return courses;
  },
  async add({
    title,
    courseCreator,
    category,
    description,
    img,
    price,
  }: addCourseForm) {
    try {
      const imgUrl = await upload(img);
      const course = {
        title,
        courseCreator,
        category,
        description,
        imgUrl,
        price: parseInt(price),
      };
      const { data } = await axios.post(`${url}/courses`, { course });
    } catch (error) {
      throw error;
    }
  },
};
