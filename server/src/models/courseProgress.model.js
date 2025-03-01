import { Schema, model } from "mongoose";

const courseProgress = Schema({
  courseId: { type: Schema.Types.ObjectId, ref: "Course" },
  completed: { type: Schema.Types.ObjectId, ref: "SubSection" },
});

const CourseProgress = model("CourseProgress", courseProgress);
export default CourseProgress;
