import { Course } from "@/data/mockData";
import axios from "axios";
import url from "./serverHelper";

export const courseServices = {
  async load(): Promise<Course[]> {
    const { data: courses } = await axios.get(`${url}/courses`);
    console.log(courses);
    return courses;
  },
};
