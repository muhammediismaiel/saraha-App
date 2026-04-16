import mongoose from "mongoose";
export function connectDb() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/saraha-application")
    .then(() => {
      console.log("dataBase connected Succsefully");
    })
    .catch((err) => {
      console.log("dataBase connection failed:", err.message);
    });
}
