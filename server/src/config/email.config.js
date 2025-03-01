import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a transporter object using Gmail service
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default transporter;
