import { Star } from "lucide-react";

type RenderstarsProps = {
  rating: number;
};

export function RenderStars({ rating }: RenderstarsProps) {
  return Array.from({ length: 5 }).map((_, i) => (
    <Star
      color="yellow"
      fill={i < Math.round(rating) ? "yellow" : "white"}
      key={i}
      className={`h-4 w-4 `}
    />
  ));
}
