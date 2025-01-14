import User from "../modals/user_modal.js";
import { googleVerify, loginuser, register_user } from "../service/auth_service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  const { email, password } = req.body;
  const hash_pass = await bcrypt.hash(password, 10);
  if (!email || !password) {
    console.log(email, password);

    return res.status(404).json({ message: "email and password requird" });
  }

    const data = await register_user(email, hash_pass);
    if (!data) {
      return res.status(200).json({ message: "lregister success full" });
    }
    res.status(404).json({ message: "user registration failed" });

    console.log(error);
  
};



export const googleauth = async (req, res) => {
  const { idToken } = req.body;
  const { email, picture, name } = await googleVerify(idToken);
  console.log(email, name);

  let user = await User.findOne({ email });
  if (!user) {
    return user = await User.create({ email: email, name: name, image: picture });
  }
  const payload = {
    email: email,
    picture: picture,
    name: name,
  };
  const token = jwt.sign(payload, secretkey);
  console.log(token);

  return res
    .status(200)
    .json({ message: "user login success fulll", user: user, token: token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await loginuser(email, password);

  const payload = {
    email: email,
    password: password,
  };

  const token = jwt.sign(payload, secretkey);
  return res
    .status(200)
    .json({ message: "user login success full", user: user, token: token });
};
