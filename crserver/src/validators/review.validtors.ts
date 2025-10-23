import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { courseService } from "../services/course.service";
const addreviewSchema = z.object({
  courseId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  }),
  description: z.string().min(3, "review is required"),
  rating: z.number().min(1).max(5),
  byUser: z.string().min(1, "byUser is required"),
});

export type AddReview = z.infer<typeof addreviewSchema>;
export const reviewValidators = {
  addReview: (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = addreviewSchema.safeParse(req.body.review);
      if (!parsed.success) {
        return res.status(400).json(parsed.error);
      }
      next();
    } catch (error) {
      console.log(error);
    }
  },
  getReviews: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      const course = await courseService.getCourseById(id);
      if (!course) {
        return res.status(400).send("invalid course");
      }
      next();
    } catch (error) {
      console.log(error);
    }
  },
};
