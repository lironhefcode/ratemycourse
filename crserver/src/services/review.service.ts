import { Request, Response } from "express";
import { Reviews } from "./db.service";
import mongoose from "mongoose";
import { courseService } from "./course.service";
export const reviewService = {
  getReviews: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const reviews = await Reviews.find({ courseId: id });
      res.json(reviews);
    } catch (err) {
      res.status(401).send([]);
    }
  },
  addReview: async (req: Request, res: Response) => {
    const { courseId, description, rating, byUser, proofUrl } = req.body.review;
    console.log(req.body.review);
    const courseIdObj = new mongoose.Types.ObjectId(String(courseId));
    const exsistingCourse = await courseService.getCourseById(courseId);
    if (!exsistingCourse) {
      return res.status(400).json({ message: "Invalid courseId" });
    }
    const newReview = new Reviews({
      courseId: courseIdObj,
      description: description,
      rating,
      byUser,
      isVerified: false,
      createdAt: Date.now(),
      proofUrl: proofUrl || "",
    });
    await newReview.save();
    courseService.updateRating(rating, exsistingCourse);
    res.json(newReview);
  },
  getunverfied: async (req: Request, res: Response) => {
    try {
      const reviews = await Reviews.find({
        isVerified: false,
        proofUrl: { $ne: "" },
      });
      res.status(200).json(reviews);
    } catch (error) {
      res.status(400).send("failed to get review");
    }
  },
};
