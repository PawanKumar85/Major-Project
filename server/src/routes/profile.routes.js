import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import * as ProfileController from "../controllers/Profile.controller.js";

const router = express.Router();

// Apply the auth middleware to all routes
router.use(auth);

// 📌 User Profile Routes
router.route("/delete").delete(ProfileController.deleteAccount); // Delete User Account

router.route("/update").patch(ProfileController.updateProfile); // Update User Profile

router.route("/details").get(ProfileController.getAllUserDetails); // Get User Details

router.route("/enrolled-courses").get(ProfileController.getEnrolledCourses); // Get Enrolled Courses

router.route("/update-picture").put(ProfileController.updateDisplayPicture); // Update Profile Picture

export default router;
