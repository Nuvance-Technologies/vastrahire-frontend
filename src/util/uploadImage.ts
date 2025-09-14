import axios from "axios";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET || "Vastrahire";

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  [key: string]: any;
}

export const uploadImageToCloudinary = async (
  image: File
): Promise<CloudinaryResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await axios.post<CloudinaryResponse>(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );

    return response.data;
  } catch (error: any) {
    console.error("Cloudinary upload failed:", error?.response || error);
    throw new Error("Image upload failed. Please try again.");
  }
};
