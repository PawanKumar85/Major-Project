import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
} from "../controllers/Profile.js";

const router = express.Router();

// 📌 User Profile Routes
router.delete("/delete", auth, deleteAccount); // Delete User Account
router.put("/update", auth, updateProfile); // Update User Profile
router.get("/details", auth, getAllUserDetails); // Get User Details
router.get("/enrolled-courses", auth, getEnrolledCourses); // Get Enrolled Courses
router.put("/update-picture", auth, updateDisplayPicture); // Update Profile Picture

export default router;
