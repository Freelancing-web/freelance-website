import mongoose from "mongoose";
import chalk from "chalk";
// connect to database
export const connectToDb = async (url) => {
  try {
    await mongoose.connect(`${url}/newFreelance`);
    console.log(
      `${chalk.yellow.bold("Database has been connected successfully")}`
    );
  } catch (error) {
    console.log("Error", error);
    process.exit(1);
  }
};
