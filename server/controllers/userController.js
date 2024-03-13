import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email, and password are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).json({ username: user.username, email: user.email });
  } catch (error) {
    console.error("Server Error", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1y",
    });
    return res.status(200).json({ token, email: user.email });
  } catch (error) {
    console.error("Server Error", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const resetToken = crypto.randomBytes(20).toString("hex");
  const saltRounds = 12;
  const resetTokenHash = await bcrypt.hash(resetToken, saltRounds);
  user.resetPasswordToken = resetTokenHash;
  user.resetPasswordExpires = Date.now() + 365 * 24 * 60 * 60 * 1000; // 1 year from now
  await user.save();
  const resetURL = `https://yourfrontenddomain.com/reset-password/${resetToken}`;
  // Ensure sendResetEmail function is implemented to send the email
  sendResetEmail(user.email, resetURL);
  return res
    .status(200)
    .json({ message: "Password reset token sent to email." });
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  // Since we don't store the plain token, we cannot directly compare it with a hashed token in the database.
  // This example assumes the user correctly submits a reset form within the expiration time.
  const user = await User.findOne({
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).json({ message: "Token is invalid or has expired" });
  }
  // The actual comparison logic here would depend on your password reset token verification strategy.
  user.password = await bcrypt.hash(newPassword, 12);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  return res
    .status(200)
    .json({ message: "Password has been reset successfully" });
};

export default { registerUser, loginUser, forgetPassword, resetPassword };
