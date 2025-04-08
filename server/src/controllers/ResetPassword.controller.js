import User from "../models/user.model.js";
import { mailSender } from "../utils/mailSender.js";
import chalk from "chalk";
import crypto from "crypto";

export const resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
      });
    }
    const token = crypto.randomBytes(32).toString("hex");

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 36000,
      },
      { new: true }
    );

    const resetURL = `http://localhost:5173/update-password/${token}`;

    await mailSender(
      email,
      "Password Reset || EduSphare",
      `Your link for password reset is ${resetURL}. Click the link to reset your password.`
    );

    console.log(chalk.green(`Password reset link sent to ${email}`));

    res.json({
      success: true,
      message:
        "Email Sent Successfully, Please Check Your Email to Continue Further",
    });
  } catch (error) {
    console.log(chalk.red(`Error in resetPasswordToken: ${error.message}`));
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Sending the Reset Message`,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (confirmPassword !== password) {
      return res.json({
        success: false,
        message: "Password and Confirm Password Do Not Match",
      });
    }

    const userDetails = await User.findOne({ token: token });

    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is Invalid",
      });
    }

    // Check if token is expired
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.status(403).json({
        success: false,
        message: "Token has Expired. Please Regenerate Your Token.",
      });
    }

    // Set the new password (this will trigger the pre-save hook)
    userDetails.password = password;
    userDetails.token = undefined;
    userDetails.resetPasswordExpires = undefined;

    await userDetails.save();

    console.log(
      chalk.green(`Password reset successful for user ${userDetails.email}`)
    );
    res.json({
      success: true,
      message: "Password Reset Successful",
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: "Some Error Occurred While Updating the Password",
    });
  }
};
