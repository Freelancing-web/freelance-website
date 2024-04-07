import chalk from "chalk";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.js";
import user from "../Models/user-model.js";
export const registerUser = async (req, res) => {
  try {
    console.log('register api started api here ')
    const { username, email, password } = req.body;
    if(!username || !email || !password) return res.status(404).json('all fields are required')
    const isUserExists = await user.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: email.toLowerCase() },
      ],
    });

    
    if (isUserExists) return res.status(400).json("User Already Exists");

    const newUser = new user({ username, email, password });
    await newUser.save();
    return res.status(200).json(newUser);
  } catch (error) {
    console.log(`${chalk.red.bold(error)}`);
    return res.status(500).json(error.message);
  }
};
export const login = async (req, res) => {
  try {

    console.log("login user",req.body);
    const { email, password } = req.body;
    if( !email || !password) return res.status(404).json('all fields are required')
    // console.log('password',password)
    const validUser = await user.findOne({ email:email.toLowerCase() }).select('+password');
  //  console.log(validUser);
    if (!validUser) return res.status(404).json("User Not Found");
    
    const isPasswordMatch =  await validUser.comparePassword(password);
    console.log('mathed .....',isPasswordMatch)
    if (!isPasswordMatch) return res.status(404).json("Incorrect Password");
    const { password: pass, ...rest } = validUser._doc;
    console.log(rest);
    const expiresIn  = 7 * 24 * 60 * 60
    const token = jwt.sign({ id: validUser._id,role:validUser.role}, SECRET_KEY,{expiresIn});

    res.cookie("accessToken", token, { httpOnly: true,secure:false,maxAge:expiresIn * 1000 }).status(200).json({rest,expiresIn});
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const signout = (req, res, next) => {
  try {
    res
      .clearCookie('accessToken')
      .status(200)
      .json('User has been signed out');
  } catch (error) {
    next(error);
  }
};
