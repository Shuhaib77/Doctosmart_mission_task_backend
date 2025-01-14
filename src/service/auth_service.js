import { OAuth2Client } from "google-auth-library";
import User from "../modals/user_modal.js";
import dotenv from "dotenv";
dotenv.config();

export const register_user = async (email, hash_pass) => {
  console.log(email, hash_pass, "dds");
  const existing_user = await User.findOne({ email });
  if (existing_user) {
    console.log("Email already exists:", email);
    throw new Error("Email already exists. Please use a different email.");
  }
  const user = User({
    email: email,
    password: hash_pass,
  });
  console.log(user, "userrss");

  if (!user) {
    throw new Error("login failed");
  }
  await user.save();
  return user;
};

export const loginuser = async (email, password) => {
  // const {email}=req.body
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("user not found ");
    }
    const checkpass = await bcrypt.compare(password, user.password);
    if (!checkpass) {
      throw new Error("password incorrect");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
export const googleVerify = async (idToken) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT,
    });
    const payload = ticket.getPayload();
    const { email, email_verified, name, picture } = payload;
    console.log(email, "tgvt4v");

    if (!email_verified) {
      throw new Error("email is not verified");
    }
    return { email, picture, name };
  } catch (error) {
    throw error;
  }
};
