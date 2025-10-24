import { Review } from "@/data/mockData";
import { CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { RenderStars } from "./RenderStars";
import { Button } from "./ui/button";

type ReviewHederProps = {
  review: Review;
};
export function ReviewHeder({ review }: ReviewHederProps) {
  return (
    <CardHeader>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold">{review.byUser}</span>
              {review.isVerified && (
                <Badge
                  variant="default"
                  className="gap-1 bg-success hover:bg-success/90"
                >
                  <ShieldCheck className="h-3 w-3" />
                  מאומת
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <RenderStars rating={review.rating} />
              </div>
              <span className="text-sm text-muted-foreground">
                {new Date(Number(review.createdAt)).toLocaleDateString("he-IL")}
              </span>
            </div>
          </div>
        </div>
        {review.proofUrl && (
          <Button variant="ghost" size="sm" asChild>
            <a href={review.proofUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
    </CardHeader>
  );
}
