import { Router } from "express";
import { checkUserExist, creatUser } from "../user/user.services.js";
import { conflictException } from "../../common/utils/error.utils.js";

const router = Router();
router.post("/signup", async (req, res, next) => {
  const { email, phoneNumber } = req.body;
  const userExist = checkUserExist({
    $or: [
      { email: { $eq: email, $exists: true, $ne: null } },
      { phoneNumber: { $eq: phoneNumber, $exists: true, $ne: null } },
    ],
  });
  if (userExist) throw new conflictException("User Already here");
  const createUser = await creatUser(req.body);
  return res.status(201).json({
    message: "user created",
    sucssess: true,
    data: { creatUser },
  });
});

export const authRouter = router;
