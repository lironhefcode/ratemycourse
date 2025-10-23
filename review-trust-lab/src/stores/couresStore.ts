import { Course } from "@/data/mockData";
import { courseServices } from "@/services/course.service";
import { create } from "zustand";

interface coursesState {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  loadCourses: () => Promise<void>;
}

export const useCoursesStore = create<coursesState>()((set) => ({
  courses: [],
  setCourses: (courses: Course[]) => {
    set({ courses });
  },
  loadCourses: async () => {
    const courses = await courseServices.load();
    set({ courses });
  },
}));
