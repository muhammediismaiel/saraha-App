import multer, { diskStorage } from "multer";
import fs from "fs";
import { BadRequestException } from "./error.utils.js";
export const fileUpload = () => {
  return multer({
    fileFilter: (req, file, cb) => {
      if (["image/png", "image/jpg", "image/gif"].includes(file.mimetype)) {
        cb(new BadRequestException("invalid format"), false);
      }
      cb(null, true);
    },
    storage: diskStorage({
      destination: (req, file, cb) => {
        if (!fs.existsSync(`uploads/${req.user._id}`)) {
          fs.mkdirSync(`uploads/${req.user._id}`);
        }
        cb(null, `uploads/${req.user._id}`);
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + Math.random() + "__" + file.originalname);
      },
    }),
  });
};
