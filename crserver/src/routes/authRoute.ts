import express from "express";
import { authService } from "../services/auth.service";

export const authRoutes = express.Router();

authRoutes.post("/google/login", authService.googleLogin);
