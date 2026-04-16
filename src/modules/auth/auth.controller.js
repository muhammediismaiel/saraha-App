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

const router = Router();

// ─── Sign Up ────────────────────────────────────────────────────────────────
router.post("/signup", async (req, res, next) => {
  try {
    const { email, phoneNumber, password } = req.body;

    // 1. Check duplicate
    const userExist = await checkUserExist({
      $or: [
        { email: { $eq: email, $exists: true, $ne: null } },
        { phoneNumber: { $eq: phoneNumber, $exists: true, $ne: null } },
      ],
    });
    if (userExist) throw new conflictException("User already exists");

    // 2. Hash password & encrypt phone BEFORE saving
    req.body.password = await bcrypt.hash(password, 10);
    if (phoneNumber) req.body.phoneNumber = encryption(phoneNumber);

    // 3. Persist
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

// ─── Login ───────────────────────────────────────────────────────────────────
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const userExist = await checkUserExist({
      email: { $eq: email, $exists: true, $ne: null },
    });
    if (!userExist) throw new NotFoundtException("User not found");

    // 2. Verify password
    const match = await bcrypt.compare(password, userExist.password);
    if (!match) throw new BadRequestException("Invalid credentials");

    // 3. Issue JWT
    const token = generateToken(
      { _id: userExist._id, role: userExist.role },
    );

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

