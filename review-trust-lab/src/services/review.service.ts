import axios from "axios";
import { upload } from "./uploadService";
import { Review } from "@/data/mockData";
interface ReviewData {
  courseId: string;
  byUser: string;
  rating: number;
  description: string;
  file: File;
}
export const reviewService = {
  async getReviews(courseId: string) {
    const { data: reviews } = await axios.get(
      `http://localhost:3000/reviews/${courseId}`
    );
    console.log(reviews);
    return reviews;
  },
  async addReview(r: ReviewData) {
    let review: any = r;
    console.log(r.file);
    if (r.file) {
      const fileUrl = await upload(r.file);
      review = {
        ...r,
        proofUrl: fileUrl,
      };
    }
    const { data } = await axios.post(`http://localhost:3000/reviews/`, {
      review,
    });
    return data;
  },
  async getUnVerified() {
    try {
      const reviews = await axios.get<Review[]>(
        `http://localhost:3000/reviews/unverified`
      );
      return reviews.data;
    } catch (error) {}
  },
};
