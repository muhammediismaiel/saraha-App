import express from "express";
import { connectDb } from "./DataBase/index.js";
import { authRouter } from "./modules/auth/auth.controller.js";
const app = express();
const port = 3000;
connectDb();
app.use(express.json());
app.use("/auth", authRouter);
app.use((error, req, res, next) => {
  console.warn(error.message);
  return res
    .status(error.cause || 500)
    .json({ message: error.message, succsess: fales });
});
app.listen(port, () => {
  (console.log("app is running on port "), port);
});
