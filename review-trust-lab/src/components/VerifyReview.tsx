import { Review } from "@/data/mockData";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

type VerfiyReviewProps = {
  review: Review;
};

export function VerfiyReview({ review }: VerfiyReviewProps) {
  return (
    <div className="flex items-center justify-between pt-2 border-t">
      {review.proofUrl && (
        <Button variant="ghost" size="sm" asChild>
          <a href={review.proofUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      )}
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          אמת ביקורת
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive"
        >
          דחה
        </Button>
      </div>
    </div>
  );
}
