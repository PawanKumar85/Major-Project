import { v2 as cloudinary } from "cloudinary";
import chalk from "chalk";

export const uploadImageToCloudinary = async (
  file,
  folder,
  height,
  quality
) => {
  try {
    if (!file || !file.tempFilePath) {
      console.error(chalk.red("❌ Invalid file input for Cloudinary upload"));
      throw new Error("Invalid file input");
    }

    const options = {
      folder,
      resource_type: "auto",
      ...(height && { height }), 
      ...(quality && { quality }),
    };

    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    console.log(chalk.green("✅ Image uploaded successfully to Cloudinary"));

    return result;
  } catch (error) {
    console.error(chalk.red("❌ Cloudinary Upload Error:"), error.message);
    throw error;
  }
};
