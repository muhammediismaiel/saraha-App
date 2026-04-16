import { unauthorizedException } from "../common/index.js";
import { verifyToken } from "../common/utils/jwt.utils.js";

export function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer "))
      throw new unauthorizedException("No token provided");

    const token = authHeader.split(" ")[1];
    req.user = verifyToken(token);
    next();
  } catch {
    next(new unauthorizedException("Invalid or expired token"));
  }
}
