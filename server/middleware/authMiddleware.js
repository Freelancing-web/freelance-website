import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.js";

export const authenticate = (req, res, next) => {

  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json("Access Denied Please Login..");

  // console.log('accestoken',token);
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    // console.log('decoed',decoded)
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};
