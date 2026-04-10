import { model, Schema } from "mongoose";
import { SYS_Gender, SYS_Role } from "../../../common/index.js";
const schema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      milength: 8,
    },
    gender: {
      type: Number,
      enum: object.values(SYS_Gender),
      default: SYS_Gender.male,
    },
    role: {
      type: Number,
      enum: object.values(SYS_Role),
      default: SYS_Role.user,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      maxlength: 11,
    },
  },
  { timestamps: true },
);
export const User = model("User", schema);
