import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  categoryName: {
    type: String,
    index: true,
    unique: true,
    lowercase: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  course: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const Category = model("Category", categorySchema);

export default Category;
