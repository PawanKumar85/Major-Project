import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  courseName: String,
  description: String,
  instructor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  whatYouWillLearn: String,
  courseContent: [
    {
      type: Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  ratingReview: [
    {
      type: Schema.Types.ObjectId,
      ref: "RatingReview",
    },
  ],
  price: Number,
  thumbnail: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  studentEnroll: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

const CourseSchema = model("Course", courseSchema);
export default CourseSchema;
