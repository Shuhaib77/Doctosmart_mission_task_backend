import mongoose from "mongoose";

export const connect_db = () => {
  mongoose
    .connect("mongodb://localhost:27017/Doctosmart")
    .then(() => console.log("db connected"))
    .catch((error) => console.log(error));
};
