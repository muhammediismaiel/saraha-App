import express from "express";
import "dotenv/config";
import { connectDb } from "./DataBase/index.js";
import { authRouter } from "./modules/auth/auth.controller.js";
import { userRouter } from "./modules/user/user.controller.js";

const app = express();
const port = 3000;

connectDb();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use((error, req, res, next) => {
  console.warn(error.message);
  return res
    .status(error.cause || 500)
    .json({ message: error.message, success: false });
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
