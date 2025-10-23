import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ShieldCheck, ThumbsUp, ExternalLink } from "lucide-react";
import { Review } from "@/data/mockData";
import { RenderStars } from "./RenderStars";
import { ReviewHeder } from "./ReviewHeader";
import { VerfiyReview } from "./VerifyReview";

interface ReviewCardProps {
  review: Review;
  showActions?: boolean;
}

export const ReviewCard = ({
  review,
  showActions = false,
}: ReviewCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow" dir="rtl">
      <ReviewHeder review={review} />
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {review.description}
        </p>
        {showActions && <VerfiyReview review={review} />}
      </CardContent>
    </Card>
  );
};
