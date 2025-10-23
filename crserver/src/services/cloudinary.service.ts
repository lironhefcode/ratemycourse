import crypto from "crypto";
import { Request, Response } from "express";

export function getSignture(req: Request, res: Response) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const paramsToSign = `timestamp=${timestamp}&upload_preset=${process.env.CLOUDINARY_PRESET}`;
  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign + process.env.CLOUDINARY_SECRET)
    .digest("hex");

  res.json({ timestamp, signature });
}
