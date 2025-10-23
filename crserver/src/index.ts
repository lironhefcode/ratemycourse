import express from "express";
import { connectDB } from "./services/db.service";
import { courseRoutes } from "./routes/courseRoutes";
import { reviewRoutes } from "./routes/reviewRoutes";
import dotenv from "dotenv";
import cors from "cors";
import { authRoutes } from "./routes/authRoute";
import { v2 as cloudinary } from "cloudinary";
import { uploadRoutes } from "./routes/uploadRoutes";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_SECRET
) {
  throw new Error("invalid cloudinary keys");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
app.use("/courses", courseRoutes);
app.use("/reviews", reviewRoutes);
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  connectDB().catch((err) => {
    console.error("Failed to connect to the database", err);
  });
});
