import cloudinary from "cloudinary";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const cloudinaryConnect = () => {
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    console.log(chalk.green("✅ Cloudinary successfully connected!"));
  } catch (error) {
    console.error(
      chalk.red("❌ Cloudinary connection failed: "),
      error.message
    );
    throw new Error("Cloudinary configuration failed");
  }
};

export default cloudinaryConnect;
