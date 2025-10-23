import { useCoursesStore } from "@/stores/couresStore";

export function useCourseById(id: string) {
  const courses = useCoursesStore((state) => state.courses);
  return courses.find((course) => course._id === id);
}
