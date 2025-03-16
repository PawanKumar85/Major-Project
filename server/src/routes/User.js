import express from "express";
import { login, signup, sendotp, changePassword } from "../controllers/Auth.js";
import {
  resetPasswordToken,
  resetPassword,
} from "../controllers/ResetPassword.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

// 📌 Authentication Routes
router.post("/login", login); // User login
router.post("/signup", signup); // User signup
router.post("/send-otp", sendotp); // Send OTP to email
router.post("/change-password", auth, changePassword); // Change password (Authenticated)

// 📌 Password Reset Routes
router.post("/reset-token", resetPasswordToken); // Generate password reset token
router.post("/reset", resetPassword); // Reset password after verification

export default router;
