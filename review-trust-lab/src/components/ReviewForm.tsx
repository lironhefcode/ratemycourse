import { Star, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "./ui/card";
import { useCallback } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { upload } from "@/services/uploadService";
import { reviewService } from "@/services/review.service";
import { useAuth } from "@/providers/auth";

type ReviewFormValues = {
  rating: number;
  description: string;
  proof?: File;
};

interface ReviewFormProps {
  courseId: string;
  setReviews: Function;
}

export function ReviewForm({ courseId, setReviews }: ReviewFormProps) {
  const { auth } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    defaultValues: { rating: 1, description: "" },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const rating = watch("rating");
  const proof = watch("proof");
  const onSubmit = useCallback(async (data: ReviewFormValues) => {
    // TODO: replace with API call
    const firstFile = data.proof[0] || null;
    const review = await reviewService.addReview({
      courseId: courseId,
      byUser: auth.user.email,
      rating: data.rating,
      description: data.description,
      file: firstFile,
    });
    setReviews((prev) => [...prev, review]);
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">כתוב ביקורת</h2>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label className="mb-2 block">דירוג</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setValue("rating", star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      color="yellow"
                      fill={star <= rating ? "yellow" : "white"}
                      className={`h-8 w-8 
                      
                    }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="description">הביקורת שלך</Label>
              <Textarea
                id="description"
                placeholder="שתף את החוויה שלך עם הקורס..."
                rows={6}
                {...register("description", {
                  required: "שדה זה חובה",
                  minLength: { value: 10, message: "יש לכתוב לפחות 10 תווים" },
                })}
              />
              {errors.description && (
                <p className="text-sm text-destructive mt-1">
                  {errors.description.message as string}
                </p>
              )}
            </div>
            <div>
              <p>{proof?.[0] ? proof[0]?.name : ""}</p>
              <Label>הוכחת רכישה (אופציונלי)</Label>
              <input
                id="proof"
                type="file"
                className="opacity-0"
                {...register("proof", {
                  setValueAs: (files: FileList) => files?.[0],
                  validate: (file?: File) => {
                    if (!file[0]) return true;
                    const maxSizeMb = 5;
                    const validTypes = [
                      "image/jpeg",
                      "image/png",
                      "application/pdf",
                    ];
                    if (file.size > maxSizeMb * 1024 * 1024)
                      return `קובץ עד ${maxSizeMb}MB`;
                    if (!validTypes.includes(file[0].type))
                      return "סוג קובץ לא נתמך";
                    return true;
                  },
                })}
              />
              <label htmlFor="proof">
                <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    העלה צילום מסך של הרכישה שלך
                  </p>
                </div>
              </label>
              {errors.proof && (
                <p className="text-sm text-destructive mt-1">
                  {errors.proof.message as string}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              פרסם ביקורת
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
