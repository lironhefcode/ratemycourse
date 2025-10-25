import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { CourseCard } from "@/components/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories as categOriesoptions, Course } from "@/data/mockData";
import { Search } from "lucide-react";
import { courseServices } from "@/services/course.service";
import { useCoursesStore } from "@/stores/couresStore";
import { set } from "date-fns";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const courses = useCoursesStore((state) => state.courses);
  const loadCourses = useCoursesStore((state) => state.loadCourses);
  const categories = [...categOriesoptions, "all"];
  useEffect(() => {
    loadCourses();
  }, []);

  if (!courses) {
    return <div>loading....</div>;
  }
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.includes(searchQuery) ||
      course.courseCreator.includes(searchQuery) ||
      course.description.includes(searchQuery);
    const matchesCategory = category === "all" || course.category === category;
    return matchesSearch && matchesCategory;
  });
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8" dir="rtl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">הקורסים שלנו</h1>
          <p className="text-muted-foreground">
            עיין בביקורות אמיתיות ממשתמשים שרכשו את הקורסים
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="חפש קורס, מרצה או נושא..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="כל הקטגוריות" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat === "all" ? "כל הקטגוריות" : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              לא נמצאו קורסים מתאימים
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Courses;
