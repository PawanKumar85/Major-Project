import { Schema, model } from "mongoose";
import { sendEmail } from "../utils/mailer.utils.js";

const otpSchema = new Schema({
  email: {
    type: String,
    index: true,
    required: true,
  },
  otp: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 300,
  },
});

// async function sendOTPEmail(email, otp) {
//   try {
//     const mailResponse = await sendEmail(
//       email,
//       "Verification Email from EduSphare",
//       otp
//     );
//     console.log("OTP email sent successfully:", mailResponse);
//   } catch (error) {
//     console.error("Error sending OTP email:", error.message);
//     throw new Error("Error sending OTP email");
//   }
// }

// Send OTP through email notification
otpSchema.pre("save", async function (next) {
  try {
    await sendEmail(
      this.email,
      "Verification Email from EduSphare",
      `Your OTP is: ${this.otp}`
    );
    console.log("OTP email sent successfully");
    next();
  } catch (error) {
    console.error("Error sending OTP email:", error.message);
    next(error); 
  }
});

const OTP = model("OTP", otpSchema);
export default OTP;
