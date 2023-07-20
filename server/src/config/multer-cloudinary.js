import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinaryV2 from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const cloudinary = cloudinaryV2.v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "wdpt014",
    format: async (req, file) => {
      let extension = "";
      if (file.mimetype.includes("image")) extension = file.mimetype.slice(6);

      console.log("🚀 ~ INSIDE MULTER STORAGE file:", extension);
      return extension;
    },
    public_id: (req, file) => Date.now(),
  },
});

export default multer({ storage: storage });

//  https://res.cloudinary.com/dgqr3qzxk/image/upload/v1687972365/wdpt014/1687972363761.jpg

//                                                                wdpt014/1687972538130
