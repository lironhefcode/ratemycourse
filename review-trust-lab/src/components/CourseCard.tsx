import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Course } from "@/data/mockData";
import { RenderStars } from "./RenderStars";

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link to={`/courses/${course._id}`}>
      <Card
        className="overflow-hidden hover:shadow-lg transition-shadow h-full"
        dir="rtl"
      >
        <div className="aspect-video overflow-hidden">
          <img
            src={course.imgUrl}
            alt={course.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge variant="secondary">{course.category}</Badge>
          </div>
          <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
          <CardDescription className="line-clamp-1">
            {course.courseCreator}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <RenderStars rating={course.reviewAvg} />
            <span className="font-semibold">{course.reviewAvg.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">
              ({course.reviewCount} ביקורות)
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
