import User from "../../models/user.model.js";
import Profile from "../../models/profile.model.js";
import OTP from "../../models/otp.model.js";
import { getOTP } from "../../utils/genOTP.utils.js";
import chalk from "chalk";

const createUserProfile = async () => {
  try {
    const newProfile = new Profile({
      gender: "",
      dateOfBirth: "",
      about: "",
      contact: "",
    });
    await newProfile.save();
    return newProfile._id;
  } catch (error) {
    console.error(chalk.red("Error creating user profile:", error.message));
    throw new Error("Failed to create user profile");
  }
};

// send OTP
export const sendOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Please provide an email address",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({
        success: false,
        message: "Email address is already registered",
      });
    }

    // OTP Generator
    const otp = getOTP();
    const otpPayLoad = { email, otp };
    const otpData = await OTP.create(otpPayLoad);

    console.log(chalk.yellow("Created OTP Generator : ", otpData));

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error(
      chalk.red("General Error sending/saving OTP:", error.message)
    );

    res.status(500).json({
      success: false,
      message: `An unexpected error occurred while processing your request`,
    });
  }
};

// sign up
export const signUp = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    phoneNumber,
    role,
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
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }
  try {
    // Find User is already
    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({
        success: false,
        message: "Email address is already registered",
      });
    }

    // OTP Validation
    const otpData = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log(chalk.yellow("Retrieved OTP Generator : ", otpData));

    if (otpData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "OTP not found or expired",
      });
    } else if (otp !== otpData) {
      return res.status(404).json({
        success: false,
        message: "Incorrect OTP",
      });
    }

    // Create a new user profile
    const profileId = await createUserProfile();

    // save data into database
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role,
      additionalDetails: profileId,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`,
    });
    await newUser.save();

    console.log(chalk.green("User saved successfully"));
    return res.status(200).json({
      success: true,
      message: "User signed up successfully",
    });
  } catch (error) {
    console.error(chalk.red("General Error signing up user:", error.message));

    res.status(500).json({
      success: false,
      message: `An unexpected error occurred while processing your request`,
    });
  }
};

// login
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = user.getToken();
    const options = user.getOptions();

    console.log(chalk.green("User logged in successfully"));
    return res.cookie("token", token, options).status(200).json({
      success: true,
      message: "User logged in successfully",
      token: token,
    });
  } catch (error) {
    console.error(chalk.red("General Error logging in user:", error.message));
    res.status(500).json({
      success: false,
      message: `An unexpected error occurred while processing your request`,
    });
  }
};

// change Password
export const changePassword = async (req, res) => {
  // Validate input passwords
  if (oldPassword === newPassword) {
    return res.status(400).json({
      success: false,
      message: "New password cannot be the same as the old password.",
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "New password and confirmation password do not match.",
    });
  }

  // Retrieve user details from request
  const { id } = req.user;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Validating Old Password
    const isValidOldPassword = await user.comparePassword(oldPassword);
    if (!isValidOldPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid old password",
      });
    }
    // Call the instance method to change the password
    const changePassword = await user.changePassword(newPassword);

    if (!changePassword) {
      return res.status(400).json({
        success: false,
        message: "Failed to change password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User password changed successfully",
    });
  } catch (error) {
    console.error(
      chalk.red("General Error Password Changing :", error.message)
    );
    res.status(500).json({
      success: false,
      message: `An unexpected error occurred while processing your request`,
    });
  }
};

// reset password token
export const resetPasswordToken = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.sendPasswordResetEmail();

    console.log(chalk.green("Reset Password Token sent successfully"));
    return res.status(200).json({
      success: true,
      message: "Reset Password Token sent successfully",
    });
  } catch (error) {
    console.error(chalk.red("General Error Password Reset :", error.message));
    res.status(500).json({
      success: false,
      message: `An unexpected error occurred while processing your request`,
    });
  }
};

// reset password
export const resetPassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const { token } = req.params;
  if (!token || !newPassword || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "New password and confirmation password do not match.",
    });
  }
  try {
    const user = await User.findOne({ resetPasswordToken: token });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or reset password token is invalid",
      });
    }

    // Call the instance method to reset the password
    const passwordReset = await user.resetPassword(newPassword);

    if (!passwordReset) {
      return res.status(500).json({
        success: false,
        message: "Failed to reset user password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User password reset successfully",
    });
  } catch (error) {
    console.error(chalk.red("General Error Password Reset :", error.message));
    res.status(500).json({
      success: false,
      message: `An unexpected error occurred while processing your request`,
    });
  }
};
