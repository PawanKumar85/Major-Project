import { Upload } from "@aws-sdk/lib-storage";
import s3 from "./../config/awsS3.config.js";
import chalk from "chalk";

const uploadToS3 = async (file) => {
  try {
    const imageKey = `Raw-images/${Date.now()}-${file.originalname}`;

    const upload = new Upload({
      client: s3,
      params: {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: imageKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      },
    });

    console.log(chalk.green(`Image uploaded to S3: ${uploadResult.Location}`));
    const uploadResult = await upload.done();
    return uploadResult.Location;
  } catch (error) {
    console.log(chalk.ansi256("Error uploading image to S3:", error.message));
    return null;
  }
};

export default uploadToS3;
