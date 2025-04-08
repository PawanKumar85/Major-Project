import otpGenerator from "otp-generator";
import dotenv from "dotenv";
import chalk from "chalk";

import User from "../models/user.model.js";
import OTP from "../models/OTP.model.js";
import Profile from "../models/profile.model.js";

import { mailSender } from "../utils/mailSender.js";
import { passwordUpdated } from "../mail/templates/passwordUpdate.js";

dotenv.config();

// Signup Controller
export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please log in.",
      });
    }
    const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!otpRecord || otpRecord.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP." });
    }

    const approved = accountType === "Instructor" ? false : true;

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password,
      accountType,
      approved,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`,
    });
    return res
      .status(201)
      .json({ success: true, user, message: "User registered successfully." });
  } catch (error) {
    console.log(chalk.red(error.message));
    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }
    const user = await User.findOne({ email }).populate("additionalDetails");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }
    // Generate JWT token using the instance method generateToken
    const token = await user.generateToken();

    // Remove the password field from the user object before sending response
    user.password = undefined;

    // Optionally, set the token in a cookie
    res.cookie("token", token, {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // expires in 3 days
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      token,
      user,
      message: "Login successful.",
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    return res
      .status(500)
      .json({ success: false, message: "Login failed. Please try again." });
  }
};

// Send OTP Controller
export const sendotp = async (req, res) => {
  try {
    const { email } = req.body;
    if (await User.findOne({ email })) {
      return res
        .status(400)
        .json({ success: false, message: "User already registered." });
    }
    let otp;

    do {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
    } while (await OTP.findOne({ otp }));

    await OTP.create({ email, otp });
    res
      .status(200)
      .json({ success: true, message: "OTP sent successfully.", otp });
  } catch (error) {
    console.log(chalk.red(error.message));
    return res
      .status(500)
      .json({ success: false, message: "Error sending OTP." });
  }
};

// Change Password Controller
export const changePassword = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    const isMatch = await userDetails.comparePassword(oldPassword);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect old password." });
    }

    // Check if the new password is different from the old password
    if (oldPassword === newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "New password must be different." });
    }

    // Verify that the new password and confirm new password match
    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match." });
    }

    userDetails.password = newPassword;
    await userDetails.save();

    // Optionally, send a notification email about the password change
    try {
      await mailSender(
        userDetails.email,
        "Your password has been updated successfully",
        passwordUpdated(
          userDetails.email,
          `${userDetails.firstName} ${userDetails?.lastName}`
        )
      );
    } catch (error) {
      console.error(chalk.red("Email notification failed:", error.message));
    }

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully." });
  } catch (error) {
    console.error(chalk.red("Password update error:", error.message));
    return res
      .status(500)
      .json({ success: false, message: "Error updating password." });
  }
};

// Logout Controller
export const logout = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.error(chalk.red("Logout error:", error.message));
    return res.status(500).json({
      success: false,
      message: "Error while logging out. Please try again.",
    });
  }
};
