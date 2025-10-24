import axios from "axios";
import { upload } from "./uploadService";
import { Review } from "@/data/mockData";
import url from "./serverHelper";
interface ReviewData {
  courseId: string;
  byUser: string;
  rating: number;
  description: string;
  file: File;
}
export const reviewService = {
  async getReviews(courseId: string) {
    const { data: reviews } = await axios.get(`${url}/reviews/${courseId}`);

    return reviews;
  },
  async addReview(r: ReviewData) {
    let review: any = r;
    if (r.file) {
      const fileUrl = await upload(r.file);
      review = {
        ...r,
        proofUrl: fileUrl,
      };
    }
    const { data } = await axios.post(`${url}/reviews/`, {
      review,
    });
    return data;
  },
  async getUnVerified() {
    try {
      const reviews = await axios.get<Review[]>(`${url}/reviews/unverified`);
      return reviews.data;
    } catch (error) {}
  },
};
