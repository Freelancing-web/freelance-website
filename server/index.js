import express from "express";
import dotenv from "dotenv";
dotenv.config();
import colors from "colors";
import userRoutes from "./routers/userRoutes.js";
import connectDB from "./mongodb/db.js";

const app = express();

app.use(express.json());
const PORT = 8000;

app.get("/", (req, res) => {
  res.json("welcome");
});

connectDB();

app.use("/api/users", userRoutes);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`.cyan.bold);
});
