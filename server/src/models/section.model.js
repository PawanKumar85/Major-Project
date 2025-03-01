import { Schema, model } from "mongoose";

const sectionSchema = new Schema({
  sectionName: String,
  subSection: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubSection",
      required: true,
    },
  ],
});

const Section = model("Section", sectionSchema);

export default Section;
