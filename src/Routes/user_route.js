import express from "express";
import {
  googleauth,
  login,
  register,
} from "../controllers/user_auth_controller.js";
import tryCatch from "../middlewares/try_catch.js";

const user_routes = express.Router();

user_routes.post("/user/register", tryCatch(register));
user_routes.post("/user/login", tryCatch(login));
user_routes.post("/googlelogin", tryCatch(googleauth));

export default user_routes;
