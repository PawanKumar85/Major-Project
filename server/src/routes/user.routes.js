import express from "express";
import * as AuthController from "../controllers/Auth.controller.js";
import * as ResetPasswordController from "../controllers/ResetPassword.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// 📌 Authentication Routes
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/signup", AuthController.signup);
router.post("/send-otp", AuthController.sendotp);
router.post("/change-password", auth, AuthController.changePassword);

// 📌 Password Reset Routes
router.post("/reset-token", ResetPasswordController.resetPasswordToken);
router.post("/reset", ResetPasswordController.resetPassword);

export default router;
