import mongoose from "mongoose";
import { mailSender } from "../utils/mailSender.js";
import { otpTemplate } from "../mail/templates/emailVerificationTemplate.js";
import chalk from "chalk";

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      otpTemplate(otp)
    );
    console.log(chalk.green(`📩 OTP Sent Successfully to: ${email}`));
  } catch (error) {
    console.error(chalk.red("❌ Error Sending OTP Email:", error.message));
    throw error;
  }
}

// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
  if (this.isNew) {
    console.log(chalk.yellow("📨 Sending OTP verification email..."));
    try {
      await sendVerificationEmail(this.email, this.otp);
    } catch (error) {
      console.error(chalk.red("❌ OTP Email Sending Failed:", error.message));
      return next(error);
    }
  }
  next();
});

const OTP = mongoose.model("OTP", OTPSchema);

export default OTP;
