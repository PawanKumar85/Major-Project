import SubSection from "../models/subSection.model.js";
import Section from "../models/section.model.js";
import chalk from "chalk";

// Create a new subsection
export const createSubSection = async (req, res) => {
  const { title, description, sectionId, timeDuration } = req.body;
  const { videoFiles } = req.files;

  if (!title || !description || !sectionId || !timeDuration) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const videoURL = await uploadToS3(videoFiles);
    const subSectionDetails = await SubSection({
      title,
      description,
      timeDuration,
      videoURL,
    });
    await subSectionDetails.save();

    const sectionDetails = await Section.findByIdAndUpdate(
      sectionId,
      { $push: { subSection: subSectionDetails._id } },
      { new: true }
    ).populate("subSection");

    console.log(
      chalk.green("Subsection created successfully:", sectionDetails)
    );
    return res.status(201).json({
      success: true,
      message: "Subsection created successfully",
      subSection: sectionDetails,
    });
  } catch (error) {
    console.error(chalk.red(error.message));
    res.status(500).json({ message: "Server Error from Subsection" });
  }
};

// update a subsection
export const updateSubSection = async (req, res) => {
  const { subSectionId, title, description, timeDuration } = req.body;
  const { videoFiles } = req.files;

  if (!subSectionId) {
    return res.status(400).json({ message: "Subsection ID is required" });
  }

  try {
    const updateData = { title, description, timeDuration };

    // If new video files are provided, upload and update the videoURL
    if (videoFiles) {
      const videoURL = await uploadToS3(videoFiles);
      updateData.videoURL = videoURL;
    }

    const updatedSubSection = await SubSection.findByIdAndUpdate(
      subSectionId,
      updateData,
      { new: true }
    );

    if (!updatedSubSection) {
      return res.status(404).json({ message: "Subsection not found" });
    }

    console.log(
      chalk.green("Subsection updated successfully:", updatedSubSection)
    );
    return res.status(200).json({
      success: true,
      message: "Subsection updated successfully",
      subSection: updatedSubSection,
    });
  } catch (error) {
    console.error(chalk.red(error.message));
    res.status(500).json({ message: "Server Error while updating subsection" });
  }
};

// Delete a subsection
export const deleteSubSection = async (req, res) => {
  const { subSectionId, sectionId } = req.body;

  if (!subSectionId || !sectionId) {
    return res
      .status(400)
      .json({ message: "Subsection ID and Section ID are required" });
  }

  try {
    // Remove the subsection
    const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId);

    if (!deletedSubSection) {
      return res.status(404).json({ message: "Subsection not found" });
    }

    console.log(
      chalk.green("Subsection deleted successfully:", deletedSubSection)
    );
    return res.status(200).json({
      success: true,
      message: "Subsection deleted successfully",
    });
  } catch (error) {
    console.error(chalk.red(error.message));
    res.status(500).json({ message: "Server Error while deleting subsection" });
  }
};
