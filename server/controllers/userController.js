import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

//Register user
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "user already exist" });
    }
    if (!username || !email || !password) {
      res
        .status(404)
        .json({ message: "username and email and password are required" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, email, password: hashedPassword });

    return res.status(201).json({ username: user.username, email: user.email });
  } catch (error) {
    console.log("Server Error", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//Login user
const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid user" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "invalid password" });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "40d",
      });
      res.status(200).json({ token, email: user.email });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export default { registerUser, loginUser };
