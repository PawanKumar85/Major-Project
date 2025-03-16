// Import necessary modules
import Section from "../models/Section.js";
import SubSection from "../models/Subsection.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
import chalk from "chalk";

// Create a new sub-section for a given section
export const createSubSection = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const { sectionId, title, description } = req.body;
    const video = req.files.video;

    // Check if all necessary fields are provided
    if (!sectionId || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // Upload the video file to Cloudinary
    let uploadDetails;
    try {
      uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
    } catch (uploadError) {
      console.log(
        chalk.red(`Cloudinary upload failed: ${uploadError.message}`)
      );
      return res.status(500).json({
        success: false,
        message: "Video upload failed",
        error: uploadError.message,
      });
    }
    // Create a new sub-section with the necessary information
    const SubSectionDetails = await SubSection.create({
      title: title,
      timeDuration: `${uploadDetails.duration}`,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });

    // Update the corresponding section with the newly created sub-section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: SubSectionDetails._id } },
      { new: true }
    ).populate("subSection");

    console.log(chalk.green(`SubSection created: ${title}`));

    // Return the updated section in the response
    res.status(200).json({
      success: true,
      message: "SubSection created successfully",
      data: updatedSection,
    });
  } catch (error) {
    // Handle any errors that may occur during the process
    console.log(chalk.red(`Error in createSubSection: ${error.message}`));
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateSubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;
    const subSection = await SubSection.findById(sectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    if (title) subSection.title = title;
    if (description) subSection.description = description;

    if (req.files?.video) {
      const video = req.files.video;
      try {
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        );
        subSection.videoUrl = uploadDetails.secure_url;
        subSection.timeDuration = `${uploadDetails.duration}`;
      } catch (uploadError) {
        console.log(
          chalk.red(`Cloudinary upload failed: ${uploadError.message}`)
        );
        return res.status(500).json({
          success: false,
          message: "Video upload failed",
          error: uploadError.message,
        });
      }
    }

    await subSection.save();
    console.log(chalk.green(`SubSection updated: ${subSection.title}`));

    res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      subSection,
    });
  } catch (error) {
    console.log(chalk.red(`Error in updateSubSection: ${error.message}`));
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    });
  }
};

export const deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    if (!subSectionId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    );
    const subSection = await SubSection.findByIdAndDelete({
      _id: subSectionId,
    });

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" });
    }

    console.log(chalk.green(`SubSection deleted: ${subSectionId}`));

    return res.json({
      success: true,
      message: "SubSection deleted successfully",
    });
  } catch (error) {
    console.log(chalk.red(`Error in deleteSubSection: ${error.message}`));
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    });
  }
};
