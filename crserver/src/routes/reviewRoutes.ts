import express from "express";
export const reviewRoutes = express.Router();
import { reviewService } from "../services/review.service";
import { reviewValidators } from "../validators/review.validtors";

reviewRoutes.get("/unverified", reviewService.getunverfied);
reviewRoutes.get("/:id", reviewValidators.getReviews, reviewService.getReviews);
reviewRoutes.post("/", reviewValidators.addReview, reviewService.addReview);
