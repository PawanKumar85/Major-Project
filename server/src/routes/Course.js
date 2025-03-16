// Import required modules
import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseDetails,
} from "../controllers/Course.js";

import {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} from "../controllers/Category.js";

import {
  createSection,
  updateSection,
  deleteSection,
} from "../controllers/Section.js";

import {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} from "../controllers/Subsection.js";

// Rating Controllers
import {
  createRating,
  getAverageRating,
  getAllRating,
} from "../controllers/RatingAndReview.js";

import { auth, isInstructor, isStudent, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

// **************************************************************************************************
//                                      📌 Course Routes (Instructor Only)
// **************************************************************************************************

// ✅ Create Course (Only Instructors)
router.post("/createCourse", auth, isInstructor, createCourse);

// ✅ Add, Update, and Delete Sections
router.post("/addSection", auth, isInstructor, createSection);
router.put("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection", auth, isInstructor, deleteSection);

// ✅ Add, Update, and Delete Sub-Sections
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.put("/updateSubSection", auth, isInstructor, updateSubSection);
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);

// ✅ Fetch All Courses & Course Details
router.get("/getAllCourses", getAllCourses);
router.get("/getCourseDetails/:id", getCourseDetails); // 🛠 Changed to GET & used `id` in params

// **************************************************************************************************
//                                      📌 Category Routes (Admin Only)
// **************************************************************************************************
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.get("/getCategoryPageDetails/:categoryId", categoryPageDetails); // 🛠 Changed to GET with categoryId

// **************************************************************************************************
//                                      📌 Ratings & Reviews (Students Only)
// **************************************************************************************************
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating/:courseId", getAverageRating); // 🛠 Changed to GET with courseId param
router.get("/getReviews/:courseId", getAllRating); // 🛠 Changed to GET with courseId param

export default router;
