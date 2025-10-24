import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { courseServices } from "@/services/course.service";

export type addCourseForm = {
  title: string;
  courseCreator: string;
  category: string;
  description: string;
  img: File;
  price: string;
};

export function AddCourseForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<addCourseForm>({
    defaultValues: {
      title: "",
      category: "",
      courseCreator: "",
      description: "",
      price: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: addCourseForm) => {
    await courseServices.add(data);
    reset();
  };

  const categories = [
    "תכנות",
    "עיצוב",
    "שיווק",
    "עסקים",
    "פיננסים",
    "בריאות",
    "חינוך",
    "אחר",
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">הוסף קורס</h2>
      <Card>
        <CardHeader>
          <CardTitle>פרטי הקורס</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
              <Label htmlFor="title">שם הקורס *</Label>
              <Input
                id="title"
                {...register("title", { required: "שם הקורס הוא שדה חובה" })}
                placeholder="הכנס את שם הקורס"
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Course Creator Field */}
            <div className="space-y-2">
              <Label htmlFor="courseCreator">יוצר הקורס *</Label>
              <Input
                id="courseCreator"
                {...register("courseCreator", {
                  required: "יוצר הקורס הוא שדה חובה",
                })}
                placeholder="הכנס את שם יוצר הקורס"
                className={errors.courseCreator ? "border-red-500" : ""}
              />
              {errors.courseCreator && (
                <p className="text-sm text-red-500">
                  {errors.courseCreator.message}
                </p>
              )}
            </div>

            {/* Category Field */}
            <div className="space-y-2">
              <Label htmlFor="category">קטגוריה *</Label>
              <Select onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger
                  className={errors.category ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="בחר קטגוריה" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <Label htmlFor="description">תיאור הקורס *</Label>
              <Textarea
                id="description"
                {...register("description", {
                  required: "תיאור הקורס הוא שדה חובה",
                })}
                placeholder="הכנס תיאור מפורט של הקורס"
                className={errors.description ? "border-red-500" : ""}
                rows={4}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price Field */}
            <div className="space-y-2">
              <Label htmlFor="price">מחיר הקורס *</Label>
              <Input
                id="price"
                type="number"
                {...register("price", {
                  required: "מחיר הקורס הוא שדה חובה",
                  min: { value: 0, message: "המחיר חייב להיות חיובי" },
                })}
                placeholder="הכנס את מחיר הקורס"
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            {/* Image Upload Field */}
            <div className="space-y-2">
              <Label htmlFor="img">תמונת הקורס *</Label>
              <Input
                id="img"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setValue("img", file);
                  }
                }}
                className={errors.img ? "border-red-500" : ""}
              />
              {errors.img && (
                <p className="text-sm text-red-500">{errors.img.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                ביטול
              </Button>
              <Button type="submit">הוסף קורס</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
