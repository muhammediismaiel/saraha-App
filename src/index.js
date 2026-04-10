import express from "express";
import { connectDb } from "../DataBase/index.js";
const app = express();
const port = 3000;
connectDb();
app.listen(port, () => {
  (console.log("app is running on port "), port);
});
