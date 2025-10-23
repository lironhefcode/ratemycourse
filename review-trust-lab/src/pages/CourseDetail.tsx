import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { ReviewCard } from "@/components/ReviewCard";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Review } from "@/data/mockData";
import { Star, Upload } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useCourseById } from "@/hooks/use-courseid";
import { reviewService } from "@/services/review.service";
import { useCoursesStore } from "@/stores/couresStore";
import { ReviewForm } from "@/components/ReviewForm";
import { Button } from "@/components/ui/button";
import { RenderStars } from "@/components/RenderStars";
import { useAuth } from "@/providers/auth";

const CourseDetail = () => {
  const [showForm, setShowForm] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const { auth } = useAuth();
  const { id } = useParams();
  const course = useCourseById(id);
  const loadCourses = useCoursesStore((state) => state.loadCourses);
  const userReview = useMemo(() => {
    return reviews.some((r) => r.byUser === auth.user.email);
  }, [reviews]);
  console.log(reviews);
  useEffect(() => {
    if (course) {
      loadReviews();
    } else {
      loadCourses();
    }
  }, [course]);
  async function loadReviews() {
    const data = await reviewService.getReviews(course._id);
    setReviews(data);
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center" dir="rtl">
          <h1 className="text-2xl font-bold">הקורס לא נמצא</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8" dir="rtl">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <img
                src={course.imgUrl}
                alt={course.title}
                className="w-full aspect-video object-cover rounded-lg mb-6"
              />
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge>{course.category}</Badge>
              </div>
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">
                מרצה: {course.courseCreator}
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <RenderStars rating={course.reviewAvg} />
                  <span className="text-xl mr-2 from-neutral-200">
                    {Math.round(course.reviewAvg)}
                  </span>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <span className="text-muted-foreground">
                  {course.reviewCount} ביקורות
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {course.description}
              </p>
            </div>

            {userReview ? (
              ""
            ) : showForm ? (
              <>
                <Button onClick={() => setShowForm(!showForm)}>
                  {" "}
                  סגור ביקורת -
                </Button>
                {userReview ? (
                  <p className="text-muted-foreground leading-relaxed">
                    כבר הוספת ביקורת לקורס זה
                  </p>
                ) : (
                  <ReviewForm setReviews={setReviews} courseId={course._id} />
                )}
              </>
            ) : (
              <Button onClick={() => setShowForm(!showForm)}>
                {" "}
                הוסף ביקורת +
              </Button>
            )}
            <Separator />

            <div>
              <h2 className="text-2xl font-bold mb-6">
                ביקורות ({reviews.length})
              </h2>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;
