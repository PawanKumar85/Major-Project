import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import chalk from "chalk";

// Update user profile
export const updateUserProfile = async (req, res) => {
  const { gender, dateOfBirth = "", about = "", contact } = req.body;

  const { id } = req.params;

  if (!gender || !contact || !id) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    // check if user exists
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    // update user profile
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.gender = gender;
    profileDetails.about = about;
    profileDetails.contact = contact;

    await profileDetails.save();
    console.log(chalk.green("User Profile updated successfully"));
    res.status(200).json({
      success: true,
      message: "User Profile updated successfully",
      data: profileDetails,
    });
  } catch (error) {
    console.error(chalk.red(error.message));
    res.status(500).json({ message: "Server Error from User Profile" });
  }
};

// delete user profile
export const deleteUserProfile = async (req, res) => {
  const { id } = req.params;

  try {
    // check if user exists
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const profileId = userDetails.additionalDetails;

    // delete user profile
    await Profile.findByIdAndDelete(profileId);
    // TODO:
    await User.findByIdAndDelete(id);
    console.log(chalk.green("User Profile deleted successfully"));
    res.status(200).json({
      success: true,
      message: "User Profile deleted successfully",
    });
  } catch (error) {
    console.error(chalk.red(error.message));
    res.status(500).json({ message: "Server Error from User Profile" });
  }
};
