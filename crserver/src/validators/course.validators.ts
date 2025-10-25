import { NextFunction, Request, Response } from "express";
import { z } from "zod";
const addCourseSchema = z.object({
  title: z.string().min(3, "not valid course title").max(30, "title to long"),
  description: z
    .string()
    .min(3, "description to short")
    .max(999, "description to long"),
  courseCreator: z
    .string()
    .min(3, "courseCreator to short")
    .max(30, "courseCreator to long"),
  category: z.string().min(3, "category to short").max(30, "category to long"),
});
export type addCourse = z.infer<typeof addCourseSchema>;
export const courseValidators = {
  addCourse: (req: Request, res: Response, next: NextFunction) => {
    const parsed = addCourseSchema.safeParse(req.body.course);
    if (!parsed.success) {
      console.log(parsed.error);
      res.status(400).json(parsed.error);
    }
    next();
  },
};
