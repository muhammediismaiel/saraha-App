import { Router } from "express";
import { checkUserExist } from "../user/user.services.js";

const router = Router();
router.post("/signup", (req, res, next) => {
  const { email, phoneNumber } = req.body;
  const userExist = checkUserExist({
    $or: [
      { email: { $eq: email, $exists: true, $ne: null } },
      { phoneNumber: { $eq: phoneNumber, $exists: true, $ne: null } },
    ],
  });
  if (userExist) throw new Error("user is here ", { cause: 409 });
});

export const authRouter = router;
