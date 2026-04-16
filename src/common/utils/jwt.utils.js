import jwt from "jsonwebtoken";
export function generateToken(
  payload,
  secret = process.env.JWT_SECRET,
  expiresIn = "7d",
) {
  if (!secret) throw new Error("JWT secret is not defined.");
  return jwt.sign(payload, secret, { expiresIn });
}
export function verifyToken(token, secret = process.env.JWT_SECRET) {
  if (!secret) throw new Error("JWT secret is not defined.");
  return jwt.verify(token, secret);
}
