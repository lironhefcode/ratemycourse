import axios from "axios";
import url from "./serverHelper";
type signature = {
  signature: string;
  timestamp: string;
};
async function getSignture() {
  try {
    const sigRes = await axios.get<signature>(`${url}/upload/signature`);
    const { signature, timestamp } = sigRes.data;
    return { signature, timestamp };
  } catch (error) {
    return null;
  }
}
export async function upload(file: File) {
  try {
    const { signature, timestamp } = await getSignture();
    if (!signature || !timestamp) {
      throw new Error("failed to get signture ");
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", import.meta.env.VITE_CLOUDINARY_KEY!);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
    const cloudRes = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      formData
    );
    const url = cloudRes.data.secure_url;

    return url;
  } catch (error) {}
}
