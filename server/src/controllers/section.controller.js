import Section from "../models/section.model.js";
import Course from "../models/course.model.js";
import chalk from "chalk";

// Create a new section for a course
export const createSection = async (req, res) => {
  const { sectionName, courseId } = req.body;

  if (!sectionName || !courseId) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newSection = await Section({
      sectionName,
    });
    await newSection.save();

    const updateCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { courseContent: newSection._id } },
      { new: true }
    );

    console.log(chalk.green("Section created successfully:", updateCourse));
    return res.status(201).json({
      success: true,
      message: "Section created successfully",
      data: updateCourse,
    });
  } catch (error) {
    console.error(chalk.red(error.message));
    res.status(500).json({ message: "Server Error from Section" });
  }
};

// Update a section
export const updateSection = async (req, res) => {
  const { sectionName, sectionId } = req.body;
  if (!sectionName || !sectionId) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const updateSection = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );
    console.log(chalk.green("Section updated successfully:", updateSection));
    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: updateSection,
    });
  } catch (error) {
    console.error(chalk.red(error.message));
    res.status(500).json({ message: "Server Error from Section" });
  }
};

// Delete a section
export const deleteSection = async (req, res) => {
  const { sectionId } = req.params;

  try {
    const deleteSection = await Section.findByIdAndDelete(sectionId);
    if (!deleteSection) {
      return res.status(404).json({ message: "Section not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Section Deleted",
    });
  } catch (error) {
    console.error(chalk.red(error.message));
    res.status(500).json({ message: "Server Error from Section" });
  }
};
