import otpGenerator from "otp-generator";
import OTP from "../models/otp.model.js";
import chalk from "chalk";

// Function to generate a unique OTP
const generateUniqueOTP = async () => {
  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  console.log(chalk.bold("OTP Generated : ", otp));

  const result = await OTP.findOne({ otp }); // Assuming this is how you query by OTP

  if (result) {
    return generateUniqueOTP(); // Recursively call until unique
  }

  return otp;
};

export const getOTP = async () => {
  return await generateUniqueOTP();
};
