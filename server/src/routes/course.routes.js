import express from "express";
import * as CourseController from "../controllers/Course.controller.js";
import * as CategoryController from "../controllers/Category.controller.js";
import * as SectionController from "../controllers/Section.controller.js";
import * as SubSectionController from "../controllers/Subsection.controller.js";
import * as RatingController from "../controllers/RatingAndReview.controller.js";

import { auth, isInstructor, isStudent, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

//  📌 Course Routes (Instructor Only)
router.post("/course", auth, isInstructor, CourseController.createCourse); // ✅ Create Course

// ✅ Sections (Add, Update, Delete)
router
  .route("/section")
  .post(auth, isInstructor, SectionController.createSection)
  .put(auth, isInstructor, SectionController.updateSection)
  .delete(auth, isInstructor, SectionController.deleteSection);

// ✅ Sub-Sections (Add, Update, Delete)
router
  .route("/sub-section")
  .post(auth, isInstructor, SubSectionController.createSubSection)
  .put(auth, isInstructor, SubSectionController.updateSubSection)
  .delete(auth, isInstructor, SubSectionController.deleteSubSection);

// ✅ Fetch Courses
router.get("/courses", CourseController.getAllCourses);
router.post("/courses", CourseController.getCourseDetails); // 🛠 Used RESTful param-based URL


// 📌 Category Routes (Admin Only)

router.post("/category", auth, isAdmin, CategoryController.createCategory);
router.get("/categories", CategoryController.showAllCategories);
router.get("/categories/:categoryId", CategoryController.categoryPageDetails); // 🛠 Used RESTful param-based URL


//   📌 Ratings & Reviews (Students Only)

router.post("/rating", auth, isStudent, RatingController.createRating);
router.get(
  "/courses/:courseId/average-rating",
  RatingController.getAverageRating
);
router.get("/courses/:courseId/reviews", RatingController.getAllRating);

export default router;
