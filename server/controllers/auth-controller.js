import chalk from "chalk";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.js";
import user from "../Models/user-model.js";
import { errorHandler } from "../utils/error-handler.js";

// register User
export const registerUser = async (req, res,next) => {
  try {
    const { username, email, password,role} = req.body;
    console.log(req.body)
    if(!username || !email || !password) return next(errorHandler(400,'All Fields Are Required'))
    const isUserExists = await user.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: email.toLowerCase() },
      ],
    });

    
    if (isUserExists) return next(errorHandler(400,'User Already Exists !!'))
   
    const newUser = new user({ username, email, password,role:(role ? role :"client")});
    await newUser.save();
    return res.status(200).json(newUser);
  } catch (error) {
    console.log(`${chalk.red.bold(error)}`);
    next(error)
  }
};
// login User 
export const login = async (req, res,next) => {
  try {

    console.log("login user",req.body);
    const { email, password } = req.body;
    if( !email || !password)return next(errorHandler(400,'All Fields Are Required'))
    // console.log('password',password)
    const validUser = await user.findOne({ email:email.toLowerCase() }).select('+password');
  //  console.log(validUser);
    if (!validUser) return next(errorHandler(404,'Oops User Not Found!!'))
    
    const isPasswordMatch =  await validUser.comparePassword(password);
    console.log('mathed .....',isPasswordMatch)
    if (!isPasswordMatch) return next(errorHandler(404,'Oops In Correct Password'))
    const { password: pass, ...rest } = validUser._doc;
    console.log(rest);
    const expiresIn  = 7 * 24 * 60 * 60
    const token = jwt.sign({ id: validUser._id,role:validUser.role}, SECRET_KEY,{expiresIn});

    res.cookie("accessToken", token, { httpOnly: true,secure:false,maxAge:expiresIn * 1000 }).status(200).json({rest,expiresIn});
  } catch (error) {
   next(error)
  }
};

// sing out User
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
