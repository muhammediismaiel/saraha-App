import { Router } from "express";
import { checkUserExist, creatUser } from "../user/user.services.js";
import {
  BadRequestException,
  conflictException,
  NotFoundtException,
} from "../../common/utils/error.utils.js";
import bcrypt from "bcrypt";
import { encryption } from "../../common/utils/cryptography.utils.js";
import { generateToken } from "../../common/utils/jwt.utils.js";
import { fileUpload } from "../../common/utils/multer.util.js";

const router = Router();

router.post("/signup", fileUpload().none(), async (req, res, next) => {
  try {
    const { email, phoneNumber, password } = req.body;

    const userExist = await checkUserExist({
      $or: [
        { email: { $eq: email, $exists: true, $ne: null } },
        { phoneNumber: { $eq: phoneNumber, $exists: true, $ne: null } },
      ],
    });
    if (userExist) throw new conflictException("User already exists");

    req.body.password = await bcrypt.hash(password, 10);
    if (phoneNumber) req.body.phoneNumber = encryption(phoneNumber);

    const newUser = await creatUser(req.body);

    return res.status(201).json({
      message: "User created",
      success: true,
      data: { user: newUser },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await checkUserExist({
      email: { $eq: email, $exists: true, $ne: null },
    });
    if (!userExist) throw new NotFoundtException("User not found");

    const match = await bcrypt.compare(password, userExist.password);
    if (!match) throw new BadRequestException("Invalid credentials");

    const token = generateToken({ _id: userExist._id, role: userExist.role });

    return res.status(200).json({
      message: "Logged in successfully",
      success: true,
      data: { token },
    });
  } catch (error) {
    next(error);
  }
});

export const authRouter = router;
