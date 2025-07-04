import axios from "axios";

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

// Utility function to upload a file to Cloudinary.
export const uploadFile = async (file: File): Promise<string | null> => {
  try {
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const response = await axios.post(CLOUDINARY_API_URL, uploadData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.secure_url; // Return the URL of the uploaded file
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    return null;
  }
};
