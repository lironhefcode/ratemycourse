import { Course } from "@/data/mockData";
import axios from "axios";

export const courseServices = {
  async load(): Promise<Course[]> {
    const { data: courses } = await axios.get("http://localhost:3000/courses");
    console.log(courses);
    return courses;
  },
};
