import { Schema, model } from "mongoose";

const subSectionSchema = new Schema({
  title: { type: String },
  timeDuration: { type: Number},
  description: { type: String, maxlength: 500 },
  videoURL: {
    type: String,
  },
});

const SubSection = model("SubSection", subSectionSchema);
export default SubSection;
