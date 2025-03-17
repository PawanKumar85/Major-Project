import Section from "../models/section.model.js";
import Course from "../models/course.model.js";
import chalk from "chalk";
// CREATE a new section

export const createSection = async (req, res) => {
  try {
    // Extract the required properties from the request body
    const { sectionName, courseId } = req.body;

    // Validate the input
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing required properties",
      });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Create a new section with the given name
    const newSection = await Section.create({ sectionName });

    // Update course with new section
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    console.log(chalk.green(`Section created: ${sectionName}`));

    // Return the updated course object in the response
    res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourse,
    });
  } catch (error) {
    // Handle errors
    console.log(chalk.red(`Error in createSection: ${error.message}`));
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// UPDATE a section
export const updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId } = req.body;
    // Validate input
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing required properties",
      });
    }

    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    if (!section) {
      console.log(chalk.red(`Section not found: ${sectionId}`));
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }
    console.log(chalk.green(`Section updated: ${sectionName}`));
    res.status(200).json({
      success: true,
      message: section,
    });
  } catch (error) {
    console.log(chalk.red(`Error in updateSection: ${error.message}`));
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// DELETE a section
export const deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.params;

    // Validate section existence
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // Remove section from course
    await Course.updateMany(
      { courseContent: sectionId },
      { $pull: { courseContent: sectionId } }
    );

    // Delete section
    await Section.findByIdAndDelete(sectionId);

    console.log(chalk.green(`Section deleted: ${sectionId}`));

    res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (error) {
    console.log(chalk.red(`Error in deleteSection: ${error.message}`));
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
