import { Router } from "express";
import { getProfile, updateProfile, deleteProfile } from "./user.services.js";
import {
  NotFoundtException,
  unauthorizedException,
} from "../../common/utils/error.utils.js";
import { decryption } from "../../common/utils/cryptography.utils.js";
import { isAuth } from "../../middleware/authmiddleware.js";

const router = Router();

router.get("/:id", isAuth, async (req, res, next) => {
  try {
    const { user } = req;
    if (!user) throw new NotFoundtException("User not found");
    if (user.phoneNumber) user.phoneNumber = decryption(user.phoneNumber);
    return res
      .status(200)
      .json({ message: "done", success: true, data: { user } });
  } catch (error) {
    next(error);
  }
});


router.delete("/:id", isAuth, async (req, res, next) => {
  try {
    if (String(req.user._id) !== req.params.id)
      throw new unauthorizedException("Access denied");

    const deleted = await deleteProfile({ _id: req.params.id });
    if (!deleted) throw new NotFoundtException("User not found");

    return res.status(200).json({ message: "Account deleted", success: true });
  } catch (error) {
    next(error);
  }
});

export const userRouter = router;

