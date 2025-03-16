import mongoose from "mongoose";

// Define the Section schema
const sectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
  },
  subSection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "SubSection",
    },
  ],
});

// Export the Section model
const Section = mongoose.model("Section", sectionSchema);
export default Section;

