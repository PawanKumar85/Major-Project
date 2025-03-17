import Profile from "../models/profile.model.js";
import User from "../models/user.model.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

// Method for updating a profile
export const updateProfile = async (req, res) => {
  try {
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
    const id = req.user.id;

    // Find the profile by id
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const profile = await Profile.findById(userDetails.additionalDetails);
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    // Update the profile fields
    profile.gender = gender;
    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.contactNumber = contactNumber;

    // Save the updated profile
    await profile.save();
    console.log(chalk.green("Profile Updated Successfully"));
    return res.json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error(chalk.red("Profile Update Error:", error.message));
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Delete Assosiated Profile with the User
    await Profile.findByIdAndDelete({ _id: user.additionalDetails });
    await User.findByIdAndDelete({ _id: id });

    console.log(chalk.green("User Account Deleted Successfully"));
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(chalk.red("Delete Account Error:", error.message));
    res
      .status(500)
      .json({ success: false, message: "User Cannot be deleted successfully" });
  }
};

export const getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .lean();

    if (!userDetails) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log(chalk.green("User Data Fetched Successfully"));
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    console.error(chalk.red("Get User Details Error:", error.message));
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateDisplayPicture = async (req, res) => {
  try {
    if (!req.files || !req.files.displayPicture) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    console.log(chalk.green("Profile Picture Updated Successfully"));
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    console.error(chalk.red("Update Display Picture Error:", error.message));
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate("courses")
      .exec();

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    console.log(chalk.green("Enrolled Courses Fetched Successfully"));
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    console.error(chalk.red("Get Enrolled Courses Error:", error.message));
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
