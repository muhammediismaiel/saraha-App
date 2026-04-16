import { NotFoundtException, unauthorizedException } from "../common/index.js";
import { verifyToken } from "../common/utils/jwt.utils.js";
import { Userrepository } from "../DataBase/index.js";

export const isAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization?.startsWith("Bearer "))
      return next(new unauthorizedException("No token provided"));

    const token = authorization.split(" ")[1];
    const payload = verifyToken(token);

    const user = await Userrepository.getOne({ _id: payload._id });
    if (!user) return next(new NotFoundtException("Access denied"));

    req.user = user;
    next();
  } catch (error) {
    next(new unauthorizedException("Invalid or expired token"));
  }
};
