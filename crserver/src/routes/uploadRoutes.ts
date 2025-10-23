import express from "express";
import { getSignture } from "../services/cloudinary.service";

export const uploadRoutes = express.Router();

uploadRoutes.get("/signature", getSignture);
