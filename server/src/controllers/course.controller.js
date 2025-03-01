import Course from "../models/course.model.js";
import Category from "../models/category.model.js";
import User from "../models/user.model.js";
import uploadToS3 from "../services/uploadS3.service.js";
import deleteFromS3 from "../services/deleteS3.service.js";
import chalk from "chalk";

// Create Course
export const createCourse = async (req, res) => {
  const { courseName, description, whatYouWillLearn, price, category } =
    req.body;
  const { thumbnail } = req.files;

  if (!courseName || !description || !whatYouWillLearn || !price || !category) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const userId = req.user?.id;
  try {
    const categoryDetail = await Category.findById(category);
    if (!categoryDetail) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const thumbnailURL = await uploadToS3(thumbnail);
    const newCourse = new Course({
      courseName,
      description,
      instructor: userId,
      whatYouWillLearn,
      price,
      thumbnail: thumbnailURL,
      category: categoryDetail._id,
    });
    await newCourse.save();

    // Add New Course into instructor Data
    await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    // Update Category Schema
    await Category.findByIdAndUpdate(
      { _id: categoryDetail._id },
      { $push: { course: newCourse._id } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error(chalk.red("Error creating course:", error));
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while processing your request",
    });
  }
};

// Get Courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find(
      {},
      {
        courseName: true,
        description: true,
        price: true,
        instructor: true,
        thumbnail: true,
        category: true,
        ratingReview: true,
        studentEnroll: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error(chalk.red("Error getting courses:", error));
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while processing your request",
    });
  }
};
