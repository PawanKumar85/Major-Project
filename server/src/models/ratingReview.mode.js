import { Schema, model } from "mongoose";

const ratingReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    trim: true,
  },
  review: {
    type: Number,
    trim: true,
    required: true,
  },
});

const RatingReview = model("RatingReview", ratingReviewSchema);

export default RatingReview;
