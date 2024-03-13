import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../Models/user-model.js";
import { errorHandler } from "../utility/error-handler.js";

// Login User 
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if ( !email || !password)
    return res.json("All Fields Are Required..");

    const validUser = await userModel.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "user not found"));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong password"));

    const { password: pass, ...rest } = validUser._doc;

    const token = jwt.sign({ id: validUser._id },process.env.JWT_SECRET_KEY);

    res.cookie("accessToken", token, { httpOnly: true }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
// Register User
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.json("All Fields Are Required..");
  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new userModel({ username, email, password: hashedPassword });
  try {
    await newUser.save(); // save for inserting the data into database
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    next(error);
  }
};

