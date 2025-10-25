import { get } from "axios";
import mongoose, { model, ObjectId } from "mongoose";
import { Course, courseSchema } from "../moudles/couresMoudle";
import { Request, Response } from "express";
import { Courses } from "./db.service";

export interface CourseService {
  getCourses: (req: Request, res: Response) => Promise<void>;
  getCourseById: (id: string) => Promise<Course | null>;
  updateRating: (rating: number, courseId: Course) => Promise<void>;
  addCourse: (req: Request, res: Response) => Promise<void>;
}

export const courseService: CourseService = {
  getCourses: async (req: Request, res: Response) => {
    const result = await Courses.find({}).lean();
    res.status(200).send(result);
  },
  getCourseById: async (id: string) => {
    try {
      const objId = new mongoose.Types.ObjectId(id);
      const course: Course | null = await Courses.findById<Course>(
        objId
      ).lean();
      return course;
    } catch (err) {
      console.error("Error fetching course by ID:");
      return null;
    }
  },
  updateRating: async (rating: number, course: Course) => {
    const newAvg =
      (course.reviewCount * course.reviewAvg + rating) /
      (course.reviewCount + 1);

    await Courses.updateOne(
      { _id: course._id },
      {
        $set: { reviewAvg: newAvg },
        $inc: { reviewCount: 1 },
      }
    );
  },
  addCourse: async (req: Request, res: Response) => {
    try {
      const { title, description, courseCreator, category, imgUrl } =
        req.body.course;

      const course = new Courses({
        title,
        description,
        courseCreator,
        category,
        imgUrl,
        reviewCount: 0,
        reviewAvg: 0,
      });
      course.save();
      res.json(course);
    } catch (error) {
      console.log(error);
    }
  },
};
