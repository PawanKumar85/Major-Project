import getRazorpayInstance from "../config/razorpay.js"; 
import Course from "../models/Course.js";
import User from "../models/User.js";
import { mailSender } from "../utils/mailSender.js";
import { courseEnrollmentEmail } from "../mail/templates/courseEnrollmentEmail.js";
import mongoose from "mongoose";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const instance = getRazorpayInstance();

//capture the payment and initiate the Razorpay order
export const capturePayment = async (req, res) => {
  //get courseId and UserID
  const { course_id } = req.body;
  const userId = req.user.id;
  //validation
  //valid courseID
  if (!course_id) {
    return res.json({
      success: false,
      message: "Please provide valid course ID",
    });
  }

  //valid courseDetail
  let course;
  try {
    course = await Course.findById(course_id);
    if (!course) {
      return res.json({
        success: false,
        message: "Could not find the course",
      });
    }

    //user already pay for the same course
    const uid = new mongoose.Types.ObjectId(userId);
    if (course.studentsEnrolled.includes(uid)) {
      return res.status(200).json({
        success: false,
        message: "Student is already enrolled",
      });
    }
  } catch (error) {
    console.error(chalk.red(error.message));
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  //order create
  const amount = course.price;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
      courseId: course_id,
      userId,
    },
  };

  try {
    //initiate the payment using razorpay
    const paymentResponse = await instance.orders.create(options);
    console.log(chalk.green(paymentResponse));
    //return response
    return res.status(200).json({
      success: true,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    res.json({
      success: false,
      message: "Could not initiate order",
    });
  }
};

//verify Signature of Razorpay and Server
export const verifySignature = async (req, res) => {
  const webhookSecret = process.env.WEBHOOK_SECRET;

  const signature = req.headers["x-razorpay-signature"];

  const shasum = crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (signature === digest) {
    console.log(chalk.green("Payment is Authorised"));

    const { courseId, userId } = req.body.payload.payment.entity.notes;

    try {
      //fulfil the action

      //find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "Course not Found",
        });
      }

      console.log(chalk.green(enrolledCourse));

      //find the student andadd the course to their list enrolled courses me
      const enrolledStudent = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { courses: courseId } },
        { new: true }
      );

      console.log(chalk.green(enrolledStudent));

      //mail send krdo confirmation wala
      // Send Confirmation Email
      if (enrolledStudent.email) {
        try {
          const emailContent = courseEnrollmentEmail(
            enrolledCourse.courseName,
            enrolledStudent.name
          );
          await mailSender(
            enrolledStudent.email,
            "Course Registration Confirmation",
            emailContent
          );
          console.log(
            chalk.green("Enrollment Email Sent to:", enrolledStudent.email)
          );
        } catch (emailError) {
          console.error(chalk.red("Email Sending Error:", emailError.message));
        }
      }

      console.log(chalk.green(emailResponse));
      return res.status(200).json({
        success: true,
        message: "Signature Verified and Course Added",
      });
    } catch (error) {
      console.log(chalk.red(error.message));
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    console.error(chalk.red("Webhook Error:", error.message));
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
