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
import {login, signup, verifyOtp} from "./auth.service.js";

const router = Router();

router.post("/signup", fileUpload().none(), async (req, res, next) => {
const createdUser = await signup(req.body);
    return res.status(201).json({
      message: "User created",
      success: true,
      data: { user: newUser },
    });
});
router.post("/login", async (req, res, next) => {
 const {accessToken, refreshToken}= await login(req.body);
  return res.status(200).json({
    message: "Logged in successfully",
    success: true,
    data: { token },
  });
});
router.patch("/refresh-token", async (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw new BadRequestException("Refresh token is required");

})
router.patch("/verify-email", async (req, res, next) => {
const verifiedDeatils = await verifyOtp(req.body);
res.status(200).json({message:"email verified",success:true});
})
export const authRouter = router;
