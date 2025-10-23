import express from "express";
import { courseService } from "../services/course.service";
import { get } from "axios";
import { courseValidators } from "../validators/course.validators";
export const courseRoutes = express.Router();

courseRoutes.get("/", courseService.getCourses);
courseRoutes.post("/", courseValidators.addCourse, courseService.addCourse);
