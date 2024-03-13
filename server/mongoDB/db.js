import mongoose from "mongoose";
import colors from "colors";

const connectDB = async (url) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB connected: ${conn.connection.host}`.yellow.underline.bold
    );
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
