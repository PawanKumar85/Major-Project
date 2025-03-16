import mongoose from "mongoose";

// Define the RatingAndReview schema
const ratingAndReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Course",
    index: true,
  },
});

// Export the RatingAndReview model
const RatingAndReview = mongoose.model(
  "RatingAndReview",
  ratingAndReviewSchema
);
export default RatingAndReview;
