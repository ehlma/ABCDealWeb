import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Eksisterende storage for artikler
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "abcdeal-artikler",
    allowed_formats: ["jpeg", "jpg", "png", "webp"],
  },
});

// Ny storage for kontaktskjema
const contactStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "abcdeal-kontaktskjema",
      allowed_formats: [
        "jpeg",
        "jpg",
        "png",
        "webp",
        "pdf",
      ],
      resource_type: "auto",
    };
  },
});

export {
  cloudinary,
  storage,
  contactStorage,
};