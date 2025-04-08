import RatingAndReview from "../models/ratingAndRaview.model.js";
import Course from "../models/course.model.js";
import { mongoose } from "mongoose";
import chalk from "chalk";

//createRating
export const createRating = async (req, res) => {
  try {
    //get user id
    const userId = req.user.id;

    //fetch data from req body
    const { rating, review, courseId } = req.body;

    //check if user is enrolled or not
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in the course",
      });
    }

    //check if user already reviewed the course
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Course is already reviewed by the user",
      });
    }
    
    //create rating and review
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });

    //update course with this rating/review
    await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: ratingReview._id,
        },
      },
      { new: true }
    );

    console.log(
      chalk.green(`Rating added by user ${userId} for course ${courseId}`)
    );
    //return response
    return res.status(200).json({
      success: true,
      message: "Rating and Review created Successfully",
      ratingReview,
    });
  } catch (error) {
    console.log(chalk.red(`Error in createRating: ${error.message}`));
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//getAverageRating
export const getAverageRating = async (req, res) => {
  try {
    //get course ID
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    //calculate avg rating
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    console.log(chalk.green(`Fetched average rating for course ${courseId}`));

    //return rating
    return res.status(200).json({
      success: true,
      averageRating: result.length > 0 ? result[0].averageRating : 0,
      message:
        result.length > 0
          ? "Average rating fetched"
          : "No ratings available yet",
    });
  } catch (error) {
    console.log(chalk.red(`Error in getAverageRating: ${error.message}`));
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//getAllRatingAndReviews
export const getAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: -1 })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .lean();

    console.log(
      chalk.green(`Fetched ${allReviews.length} reviews successfully`)
    );
    return res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: allReviews,
    });
  } catch (error) {
    console.log(chalk.red(`Error in getAllRating: ${error.message}`));
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
