import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "../utils/mailer.utils.js";
import chalk from "chalk";

dotenv.config();

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Minimum 8 character is Required"],
  },
  role: {
    type: String,
    enum: ["admin", "student", "teacher"],
    default: "student",
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  image: {
    type: String,
    required: true,
  },
  courseProgress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseProgress",
    },
  ],
});

// Pre Hook for Password Hashing
UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// Method to compare Passwords
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate JWT Token
UserSchema.methods.getToken = async function () {
  const token = jwt.sign(
    { id: this._id, email: this.email, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return token;
};

// Method to Options
UserSchema.methods.getOptions = async function () {
  const options = {
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
    httpOnly: true,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production", // secure only in production
  };

  return options;
};

// Method to change password
UserSchema.methods.changePassword = async function (newPassword) {
  // Update the password
  this.password = newPassword;
  await this.save();

  await sendEmail(
    this.email,
    "Your Password Has Been Changed Successfully",
    "Your account's password has been updated successfully."
  );

  console.log(
    chalk.green("User password changed successfully via instance method")
  );
  return true;
};

// Resets password token
UserSchema.methods.sendPasswordResetEmail = async function () {
  const token = uuidv4();
  this.resetPasswordToken = token;
  this.resetPasswordExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
  await this.save();

  // Use an environment variable for the reset URL if available
  const resetUrl =
    process.env.RESET_PASSWORD_URL ||
    `http://localhost:5173/update-password/token=${token}`;

  await sendEmail(
    this.email,
    "Reset Password",
    `You are receiving this email because you requested a password reset for your account. Please click on the following link to complete the process: ${resetUrl}`
  );
  console.log(chalk.green("Reset Password Token sent successfully"));
  return token;
};

// Updates password via token
UserSchema.methods.resetPassword = async function (newPassword) {
  if (!this.resetPasswordExpires || this.resetPasswordExpires < Date.now()) {
    throw new Error("Reset password token has expired");
  }

  // Update the password and clear the reset token fields
  this.password = newPassword;
  this.resetPasswordToken = null;
  this.resetPasswordExpires = null;
  await this.save();

  // Send a confirmation email
  await sendEmail(
    this.email,
    "Your Password Has Been Reset Successfully",
    "Your account's password has been reset successfully."
  );

  console.log(
    chalk.green("User password reset successfully via instance method")
  );
  return true;
};

const User = mongoose.model("User", UserSchema);
export default User;
