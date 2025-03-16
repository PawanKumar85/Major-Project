import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(chalk.green("✅ MongoDB Connected Successfully!"));
  } catch (error) {
    console.error(chalk.red(`❌ MongoDB Connection Error:`), error.message);
    process.exit(1);
  }
};

export default connect;
