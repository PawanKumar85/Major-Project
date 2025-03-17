# Edu-Sphare

## Description

This project is a Node.js-based backend server built with Express.js. It supports user authentication, profile management, course handling, and payment processing. The server integrates with Cloudinary for file storage and uses MongoDB as its database.

## Features

- User Authentication (JWT-based)
- Profile Management
- Course Management
- Payment Processing
- Cloudinary Integration for file storage
- Secure API with CORS and Cookies
- Environment Variables for Configurations

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout

### Profile

- `GET /api/v1/profile` - Get user profile
- `PUT /api/v1/profile` - Update user profile

### Courses

- `GET /api/v1/course` - Get all courses
- `POST /api/v1/course` - Create a new course

### Payments

- `POST /api/v1/payment` - Process payment

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Cloudinary
- JWT Authentication
- CORS
- dotenv
- express-fileupload

# Models

A robust backend for an e-learning platform built with Node.js, Express, and MongoDB. This system supports user roles, course management, progress tracking, and authentication.

## Features

- **User Roles**: Admin, Student, and Instructor.
- **Course Management**: Create courses with sections, subsections, and multimedia content.
- **Categories**: Organize courses into categories.
- **Progress Tracking**: Track student progress through video completions.
- **Authentication**: JWT-based authentication and OTP email verification.
- **Reviews & Ratings**: Students can rate and review courses.
- **Profile Management**: Store additional user details like contact info and bio.

---

## Models Overview

### 1. User (`user.model.js`)

Stores user information and authentication details.

| Field               | Type            | Description                                |
| ------------------- | --------------- | ------------------------------------------ |
| `firstName`         | String          | User's first name (required).              |
| `lastName`          | String          | User's last name (required).               |
| `email`             | String          | Unique email (required, lowercase).        |
| `password`          | String          | Bcrypt-hashed password (required).         |
| `accountType`       | String          | Role: `Admin`, `Student`, or `Instructor`. |
| `additionalDetails` | ObjectId        | Linked to `Profile` model (required).      |
| `courses`           | Array[ObjectId] | Courses enrolled/created (ref: `Course`).  |
| `courseProgress`    | Array[ObjectId] | Progress tracking (ref: `CourseProgress`). |

**Relationships**:

- Links to `Profile`, `Course`, and `CourseProgress`.

---

### 2. Category (`category.model.js`)

Organizes courses into categories.

| Field         | Type            | Description                               |
| ------------- | --------------- | ----------------------------------------- |
| `name`        | String          | Category name (required).                 |
| `description` | String          | Brief category description.               |
| `courses`     | Array[ObjectId] | Courses in this category (ref: `Course`). |

---

### 3. Course (`course.model.js`)

Manages course details and content.

| Field              | Type            | Description                                |
| ------------------ | --------------- | ------------------------------------------ |
| `courseName`       | String          | Title of the course.                       |
| `instructor`       | ObjectId        | Instructor ID (ref: `User`, required).     |
| `courseContent`    | Array[ObjectId] | Sections in the course (ref: `Section`).   |
| `category`         | ObjectId        | Category ID (ref: `Category`).             |
| `studentsEnrolled` | Array[ObjectId] | Enrolled students (ref: `User`, required). |

**Relationships**:

- Links to `User`, `Section`, `RatingAndReview`, and `Category`.

---

### 4. Section & SubSection (`section.model.js`, `subSection.model.js`)

Structures course content hierarchically.

**Section**:
| Field | Type | Description |
|----------------|--------------|----------------------------------|
| `sectionName` | String | Name of the section. |
| `subSection` | Array[ObjectId] | Subsections (ref: `SubSection`, required). |

**SubSection**:
| Field | Type | Description |
|----------------|------|----------------------------------|
| `title` | String | Subsection title. |
| `videoUrl` | String | URL to video content. |
| `timeDuration` | String | Duration of the video. |

---

### 5. Course Progress (`courseProgress.model.js`)

Tracks student progress within a course.

| Field             | Type            | Description                                |
| ----------------- | --------------- | ------------------------------------------ |
| `courseID`        | ObjectId        | Course ID (ref: `Course`).                 |
| `completedVideos` | Array[ObjectId] | Completed subsections (ref: `SubSection`). |

---

### 6. Rating & Review (`ratingAndReview.model.js`)

Handles course ratings and reviews.

| Field    | Type     | Description                          |
| -------- | -------- | ------------------------------------ |
| `user`   | ObjectId | User ID (ref: `User`, required).     |
| `rating` | Number   | Rating (1-5, required).              |
| `review` | String   | Written feedback (required).         |
| `course` | ObjectId | Course ID (ref: `Course`, required). |

---

### 7. Profile (`profile.model.js`)

Stores additional user details.

| Field           | Type   | Description           |
| --------------- | ------ | --------------------- |
| `gender`        | String | User's gender.        |
| `dateOfBirth`   | String | User's date of birth. |
| `contactNumber` | Number | User's phone number.  |

---

### 8. OTP (`OTP.model.js`)

Manages email verification tokens.

| Field       | Type   | Description                   |
| ----------- | ------ | ----------------------------- |
| `email`     | String | User email (required).        |
| `otp`       | String | OTP code (required).          |
| `createdAt` | Date   | Auto-expires after 5 minutes. |

## Authentication

- **Password Hashing**: Uses `bcryptjs` to hash passwords before saving.
- **JWT Tokens**: Generated on login (expires in 24 hours).
- **OTP Verification**: Emails are sent using `nodemailer` with a 5-minute expiry.

---

## Controllers (Business Logic)

### Auth.controller.js

This controller handles all authentication-related operations:

#### Functions:

- **signup(req, res)**

  - Creates a new user account
  - Validates required fields (firstName, lastName, email, password, confirmPassword, OTP)
  - Verifies password and confirmPassword matching
  - Checks for existing users with the same email
  - Validates OTP against the most recent OTP record for the email
  - Sets approval status based on accountType (auto-approved for Students)
  - Creates a Profile record with null initial values
  - Creates User record with hashed password
  - Generates avatar URL using DiceBear API
  - Returns user data and success message

- **login(req, res)**

  - Authenticates users
  - Validates email and password presence
  - Finds user by email and populates additional details
  - Compares password using the model's comparePassword method
  - Generates JWT token using the model's generateToken method
  - Sets HTTP-only cookie with token (3-day expiration)
  - Returns token, user data (excluding password), and success message

- **sendotp(req, res)**

  - Sends OTP for email verification
  - Checks if email is already registered
  - Generates a 6-digit numeric OTP using otp-generator
  - Ensures uniqueness by checking against existing OTPs
  - Stores OTP in database with email association
  - Returns success message and OTP

- **changePassword(req, res)**
  - Updates user password
  - Retrieves user from request (set by auth middleware)
  - Verifies old password correctness
  - Ensures new password differs from old password
  - Confirms new password matches confirmation
  - Updates password in database (model handles hashing)
  - Sends password update notification email
  - Returns success message

### Category.controller.js

Manages course categories and their relationships:

#### Functions:

- **createCategory(req, res)**

  - Creates a new course category
  - Validates name presence (required field)
  - Creates category with name and optional description
  - Logs creation details with chalk
  - Returns success message

- **showAllCategories(req, res)**

  - Lists all categories
  - Retrieves only necessary fields (name, description)
  - Returns array of categories

- **categoryPageDetails(req, res)**
  - Gets detailed information about a specific category
  - Finds category by ID and populates associated courses
  - Also retrieves courses from different categories for recommendations
  - Returns both selected category data and different categories data

### Course.controller.js

Handles course creation and retrieval operations:

#### Functions:

- **createCourse(req, res)**

  - Creates a new course
  - Extracts user ID from authenticated request
  - Validates required fields
  - Sets default status to "Draft" if not provided
  - Verifies instructor account type
  - Validates category existence
  - Uploads thumbnail image to Cloudinary
  - Creates course with all provided details
  - Updates instructor's courses array
  - Updates category's courses array
  - Returns course data and success message

- **getAllCourses(req, res)**

  - Retrieves all courses
  - Selects specific fields for preview (name, price, thumbnail, etc.)
  - Populates instructor information
  - Returns array of courses

- **getCourseDetails(req, res)**
  - Gets detailed information about a specific course
  - Finds course by ID
  - Populates instructor data (including additional details)
  - Populates category information
  - Populates course content (sections and subsections)
  - Returns comprehensive course data

### Payments.controller.js

Manages payment processing and course enrollment:

#### Functions:

- **capturePayment(req, res)**

  - Initiates course purchase process
  - Validates course ID
  - Checks if course exists
  - Verifies user is not already enrolled
  - Creates Razorpay order with course price
  - Includes courseId and userId in order notes
  - Returns order details, course information, and payment parameters

- **verifySignature(req, res)**
  - Confirms payment and completes enrollment
  - Verifies webhook signature using HMAC
  - Extracts courseId and userId from payment notes
  - Updates course with new student enrollment
  - Updates user's enrolled courses
  - Sends enrollment confirmation email
  - Returns success message

### Profile.controller.js

Manages user profile information and settings:

#### Functions:

- **updateProfile(req, res)**

  - Updates user profile details
  - Extracts profile data (dateOfBirth, about, contactNumber, gender)
  - Retrieves user and associated profile
  - Updates profile fields
  - Returns updated profile data

- **deleteAccount(req, res)**

  - Removes user account and associated data
  - Finds user by ID
  - Deletes associated profile
  - Deletes user record
  - Returns success message

- **getAllUserDetails(req, res)**

  - Retrieves comprehensive user information
  - Finds user by ID
  - Populates additional profile details
  - Returns user data

- **updateDisplayPicture(req, res)**

  - Updates user profile picture
  - Validates file presence
  - Uploads image to Cloudinary with resize parameters
  - Updates user record with new image URL
  - Returns updated user data

- **getEnrolledCourses(req, res)**
  - Lists courses a user is enrolled in
  - Finds user by ID
  - Populates courses array
  - Returns courses data

### RatingAndReview.controller.js

Manages course ratings and review functionality:

#### Functions:

- **createRating(req, res)**

  - Creates a new rating and review
  - Verifies user is enrolled in the course
  - Checks if user has already reviewed the course
  - Creates rating and review record
  - Updates course with new rating reference
  - Returns rating data and success message

- **getAverageRating(req, res)**

  - Calculates average rating for a course
  - Uses MongoDB aggregation pipeline
  - Matches ratings for specific course
  - Groups and calculates average
  - Returns average rating or 0 if no ratings

- **getAllRating(req, res)**
  - Retrieves all ratings and reviews
  - Sorts by rating (highest first)
  - Populates user information (name, email, image)
  - Populates course name
  - Returns array of reviews

### ResetPassword.controller.js

Handles password reset functionality:

#### Functions:

- **resetPasswordToken(req, res)**

  - Initiates password reset process
  - Validates email exists in system
  - Generates random token
  - Updates user with token and expiration time
  - Creates reset URL with token
  - Sends email with reset link
  - Returns success message

- **resetPassword(req, res)**
  - Completes password reset
  - Validates password and confirmPassword match
  - Verifies token exists and is valid
  - Checks token expiration time
  - Hashes new password
  - Updates user password
  - Returns success message

### Section.controller.js

Manages course sections:

#### Functions:

- **createSection(req, res)**

  - Creates a new course section
  - Validates required fields (sectionName, courseId)
  - Verifies course exists
  - Creates section record
  - Updates course with section reference
  - Populates section data with subsections
  - Returns updated course data

- **updateSection(req, res)**

  - Updates section information
  - Validates input
  - Updates section name
  - Returns updated section data

- **deleteSection(req, res)**
  - Removes a section from a course
  - Validates section exists
  - Removes section reference from course
  - Deletes section record
  - Returns success message

### Subsection.controller.js

Manages course subsections and content:

#### Functions:

- **createSubSection(req, res)**

  - Creates a new subsection
  - Validates required fields
  - Uploads video to Cloudinary
  - Creates subsection with video URL and duration
  - Updates parent section with subsection reference
  - Returns updated section data

- **updateSubSection(req, res)**

  - Updates subsection content
  - Updates title and description if provided
  - Uploads new video if provided
  - Updates video URL and duration
  - Returns updated subsection data

- **deleteSubSection(req, res)**
  - Removes a subsection
  - Validates required fields
  - Removes subsection reference from section
  - Deletes subsection record
  - Returns success message

## Models

### category.model.js

Defines the schema for course categories:

- **Fields**:
  - `name`: String (required, unique) - Category name
  - `description`: String - Category description
  - `courses`: Array of ObjectIds referencing Course model - Courses in this category

### course.model.js

Defines the schema for courses:

- **Fields**:
  - `courseName`: String (required) - Name of the course
  - `courseDescription`: String (required) - Description of the course
  - `instructor`: ObjectId referencing User model (required) - Course creator
  - `whatYouWillLearn`: String (required) - Learning outcomes
  - `courseContent`: Array of ObjectIds referencing Section model - Course structure
  - `ratingAndReviews`: Array of ObjectIds referencing RatingAndReview model
  - `price`: Number (required) - Course price
  - `thumbnail`: String (required) - Course image URL
  - `tag`: [String] - Course tags for categorization
  - `category`: ObjectId referencing Category model (required)
  - `studentsEnrolled`: Array of ObjectIds referencing User model - Enrolled students
  - `instructions`: [String] - Course instructions
  - `status`: String (enum: ["Draft", "Published"]) - Course visibility status

### OTP.model.js

Defines the schema for OTP storage:

- **Fields**:
  - `email`: String (required) - User email
  - `otp`: String (required) - Generated OTP code
  - `createdAt`: Date with expiration - Auto-expires after 5 minutes

### profile.model.js

Defines the schema for user profiles:

- **Fields**:
  - `gender`: String - User gender
  - `dateOfBirth`: String - User birth date
  - `about`: String - User bio/description
  - `contactNumber`: String - User phone number

### ratingAndReview.model.js

Defines the schema for course ratings and reviews:

- **Fields**:
  - `user`: ObjectId referencing User model (required) - Reviewer
  - `rating`: Number (required, min: 1, max: 5) - Rating value
  - `review`: String - Review text
  - `course`: ObjectId referencing Course model (required) - Reviewed course

### section.model.js

Defines the schema for course sections:

- **Fields**:
  - `sectionName`: String (required) - Section title
  - `subSection`: [ObjectId] referencing SubSection model - Content items

### subSection.model.js

Defines the schema for subsections:

- **Fields**:
  - `title`: String (required) - Subsection title
  - `timeDuration`: String - Video length
  - `description`: String (required) - Subsection description
  - `videoUrl`: String (required) - Video content URL

### user.model.js

Defines the schema for user accounts:

- **Fields**:

  - `firstName`: String (required) - User first name
  - `lastName`: String (required) - User last name
  - `email`: String (required, unique) - User email
  - `password`: String (required) - Hashed password
  - `accountType`: String (enum: ["Admin", "Student", "Instructor"]) - User role
  - `active`: Boolean (default: true) - Account status
  - `approved`: Boolean (default: true) - Approval status for instructors
  - `additionalDetails`: ObjectId referencing Profile model - Extended user info
  - `courses`: [ObjectId] referencing Course model - Enrolled/created courses
  - `token`: String - Password reset token
  - `resetPasswordExpires`: Date - Token expiration
  - `image`: String - Profile picture URL
  - `courseProgress`: [ObjectId] referencing CourseProgress model - Learning progress

- **Methods**:
  - `comparePassword`: Compares plain password with hashed password
  - `generateToken`: Creates JWT token for authentication

## Utilities

### imageUploader.js

Handles file uploads to Cloudinary:

- **Functions**:
  - `uploadImageToCloudinary(file, folder, height, quality)`:
    - Configures Cloudinary with environment variables
    - Handles different file types (image/video)
    - Sets optional parameters like height and quality
    - Returns upload response with URL and metadata

### mailSender.js

Manages email sending functionality:

- **Functions**:
  - `mailSender(email, title, body)`:
    - Configures nodemailer transport with SMTP settings
    - Creates email with recipient, subject, and HTML body
    - Sends email and handles response/errors
    - Returns promise with send status

## Mail Templates

### courseEnrollmentEmail.js

Template for course enrollment confirmation emails:

- **Functions**:
  - `courseEnrollmentEmail(courseName, name)`:
    - Creates HTML email body with course enrollment details
    - Includes styling and formatting
    - Returns HTML string

### passwordUpdate.js

Template for password update notification emails:

- **Functions**:
  - `passwordUpdated(email, name)`:
    - Creates HTML email body with password change notification
    - Includes security recommendations
    - Returns HTML string

## Configuration

### razorpay.config.js

Configures Razorpay payment gateway:

- **Functions**:
  - `getRazorpayInstance()`:
    - Creates and configures Razorpay instance with API keys
    - Returns singleton instance for use throughout application

## Authentication Flow

### Registration Process

1. Client requests OTP via `sendotp`

   - Backend validates email is not already registered
   - Generates unique OTP and stores with email and timestamp
   - Returns OTP to client (in production, would be sent via email)

2. Client submits registration via `signup`
   - Backend validates all required fields
   - Verifies OTP matches stored value for email
   - Creates Profile record with placeholder values
   - Creates User record with hashed password
   - Sets approval status based on account type
   - Returns user data

### Login Process

1. Client submits login credentials via `login`
   - Backend validates email and password presence
   - Retrieves user record with profile details
   - Compares password hash using bcrypt
   - Generates JWT token with user ID and role
   - Sets HTTP-only cookie with token
   - Returns token and user data

### Password Reset Flow

1. Client requests password reset via `resetPasswordToken`

   - Backend validates email exists
   - Generates secure random token
   - Updates user record with token and expiration
   - Sends email with reset link
   - Returns success message

2. Client submits new password via `resetPassword`
   - Backend validates token exists and is not expired
   - Verifies password and confirmation match
   - Updates user with new hashed password
   - Returns success message

## Course Management Flow

### Course Creation

1. Instructor creates course via `createCourse`

   - Backend validates instructor role
   - Uploads thumbnail to Cloudinary
   - Creates course record with initial empty content
   - Associates course with instructor and category
   - Returns course data

2. Instructor adds sections via `createSection`

   - Backend creates section record
   - Updates course with section reference
   - Returns updated course structure

3. Instructor adds subsections via `createSubSection`
   - Backend uploads video to Cloudinary
   - Creates subsection record with video URL and duration
   - Updates section with subsection reference
   - Returns updated section data

### Course Consumption

1. Student browses courses via `getAllCourses` or `categoryPageDetails`

   - Backend returns course preview data

2. Student views course details via `getCourseDetails`
   - Backend returns comprehensive course data with sections and content

## Enrollment Flow

1. Student initiates purchase via `capturePayment`

   - Backend checks if already enrolled
   - Creates Razorpay order with course price
   - Returns order details for payment

2. Payment webhook triggers `verifySignature`

   - Backend verifies payment authenticity
   - Updates course

## Enrollment Flow

2. Payment webhook triggers `verifySignature`

   - Backend verifies payment authenticity using HMAC
   - Updates course with student enrollment
   - Updates user's enrolled courses list
   - Sends confirmation email to student
   - Returns success confirmation

3. Student accesses course content
   - Student can view enrolled courses via `getEnrolledCourses`
   - Course content is organized by sections and subsections
   - Progress tracking is maintained through the courseProgress model

## Rating and Review System

1. Student submits rating/review via `createRating`

   - Backend verifies student is enrolled in the course
   - Checks if student has already reviewed the course
   - Creates rating and review record
   - Updates course with rating reference
   - Returns success confirmation

2. Course ratings are displayed
   - Average rating calculated via `getAverageRating`
   - All ratings retrieved via `getAllRating`
   - Ratings are sorted by value (highest first)
   - User information is included with each rating

## User Profile Management

1. User updates profile via `updateProfile`

   - Backend updates profile fields (gender, dateOfBirth, about, contactNumber)
   - Returns updated profile data

2. User updates display picture via `updateDisplayPicture`

   - Backend uploads image to Cloudinary with resize parameters
   - Updates user record with new image URL
   - Returns updated user data

3. User deletes account via `deleteAccount`
   - Backend deletes associated profile record
   - Deletes user record
   - Returns success confirmation

## Password Management

1. User changes password via `changePassword`

   - Backend verifies old password correctness
   - Ensures new password differs from old password
   - Updates password in database
   - Sends notification email
   - Returns success confirmation

2. User resets forgotten password
   - User requests reset token via `resetPasswordToken`
   - Backend generates random token and sets expiration
   - Sends email with reset link
   - User submits new password via `resetPassword`
   - Backend verifies token validity and expiration
   - Updates password in database
   - Returns success confirmation

## Content Management

1. Instructor creates course structure

   - Creates sections via `createSection`
   - Creates subsections via `createSubSection`
   - Updates sections and subsections via respective update controllers
   - Deletes sections and subsections via respective delete controllers

2. Course content organization
   - Courses contain sections (chapters/modules)
   - Sections contain subsections (lessons/videos)
   - Subsections contain actual content (videos, descriptions)

## Security Measures

1. Authentication and Authorization

   - JWT tokens for session management
   - HTTP-only cookies for secure token storage
   - Role-based access control (Admin, Student, Instructor)
   - Password hashing with bcrypt

2. Data Validation
   - Input validation for all API endpoints
   - Proper error handling and reporting
   - Secure file upload handling via Cloudinary

## API Architecture

1. RESTful API Design

   - Consistent endpoint naming conventions
   - HTTP methods aligned with operations (GET, POST, PUT, DELETE)
   - Status codes follow standard conventions

2. Controller-Model Pattern

   - Controllers handle request/response logic
   - Models define data structures and validation
   - Utilities provide shared functionality

3. Database Relations
   - MongoDB with Mongoose ODM
   - Document references for related data
   - Population for fetching related data

## Third-Party Services Integration

1. Cloudinary Integration

   - Image and video storage
   - Image optimization and resizing
   - Video duration extraction

2. Email Service

   - Nodemailer for email delivery
   - HTML email templates
   - Transactional emails for account activities

3. Payment Gateway
   - Razorpay for payment processing
   - Order creation and management
   - Webhook handling for payment verification

## Error Handling and Logging

1. Error Handling

   - Consistent error response format
   - Appropriate HTTP status codes
   - Detailed error messages for debugging

2. Logging
   - Console logging with chalk for improved readability
   - Color-coded log levels (green for success, red for errors)
   - Detailed logs for critical operations

## Development Considerations

1. Environment Configuration

   - Environment variables for sensitive information
   - Configuration isolation with dotenv
   - Different environments support (development, production)

2. Code Organization

   - Modular structure with clear separation of concerns
   - Consistent naming conventions
   - Comprehensive documentation

3. Performance Optimization
   - Database query optimization
   - Selective field retrieval
   - Efficient population of related data

## Conclusion

This EdTech platform provides a comprehensive backend API for managing educational content, user accounts, and course enrollment. The modular architecture allows for easy maintenance and extension of functionality. The integration with third-party services enhances the platform's capabilities while maintaining security and performance.

The platform supports the full lifecycle of online education, from course creation and student enrollment to content consumption and feedback collection. The robust authentication and authorization system ensures that users have appropriate access to resources based on their roles.

By following RESTful API design principles and implementing thorough error handling, the platform provides a reliable foundation for building educational applications across various devices and platforms.

# Server Configuration Documentation

## Overview

This documentation covers the configuration modules used in the server application. These modules handle connections to external services such as MongoDB, Cloudinary, and Razorpay.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Configuration Modules](#configuration-modules)
  - [Database Configuration](#database-configuration)
  - [Cloudinary Configuration](#cloudinary-configuration)
  - [Razorpay Configuration](#razorpay-configuration)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before using these configuration modules, ensure you have:

- Node.js installed (v14.x or higher recommended)
- Access credentials for MongoDB, Cloudinary, and Razorpay services
- Required packages installed:
  - mongoose
  - cloudinary
  - razorpay
  - dotenv
  - chalk

## Environment Setup

Create a `.env` file in your project root with the following variables:

```
# MongoDB Configuration
MONGODB_URL=your_mongodb_connection_string

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

# Razorpay Configuration
RAZORPAY_KEY=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_key_secret
```

## Configuration Modules

### Database Configuration

`database.config.js` handles the connection to MongoDB using Mongoose.

```javascript
import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(chalk.green("✅ MongoDB Connected Successfully!"));
  } catch (error) {
    console.error(chalk.red(`❌ MongoDB Connection Error:`), error.message);
    process.exit(1);
  }
};

export default connect;
```

### Cloudinary Configuration

`cloudinary.config.js` configures the Cloudinary SDK for media handling.

```javascript
import cloudinary from "cloudinary";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const cloudinaryConnect = () => {
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    console.log(chalk.green("✅ Cloudinary successfully connected!"));
  } catch (error) {
    console.error(
      chalk.red("❌ Cloudinary connection failed: "),
      error.message
    );
    throw new Error("Cloudinary configuration failed");
  }
};

export default cloudinaryConnect;
```

### Razorpay Configuration

`razorpay.config.js` initializes and manages the Razorpay instance for payment processing.

```javascript
import Razorpay from "razorpay";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

let razorpayInstance = null;

// Function to initialize Razorpay instance
const getRazorpayInstance = () => {
  if (razorpayInstance) {
    return razorpayInstance;
  }

  try {
    if (!process.env.RAZORPAY_KEY || !process.env.RAZORPAY_SECRET) {
      console.error(
        chalk.red("❌ Missing Razorpay API credentials in .env file")
      );
      process.exit(1);
    }

    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    console.log(chalk.green("✅ Razorpay Instance Created Successfully"));
    return razorpayInstance;
  } catch (error) {
    console.error(
      chalk.red("❌ Razorpay Instance Creation Failed:"),
      error.message
    );
    process.exit(1);
  }
};

export default getRazorpayInstance;
```

## Usage

To use these configuration modules in your application:

1. Import and execute the database connection during server startup:

```javascript
import connect from "./config/database.config.js";

// Initialize database connection
connect();
```

2. Set up Cloudinary for file uploads:

```javascript
import cloudinaryConnect from "./config/cloudinary.config.js";

// Initialize Cloudinary
cloudinaryConnect();
```

3. Get Razorpay instance when needed:

```javascript
import getRazorpayInstance from "./config/razorpay.config.js";

// Get Razorpay instance when needed for payment operations
const razorpay = getRazorpayInstance();

// Use razorpay for operations
const order = await razorpay.orders.create({
  amount: 50000, // amount in the smallest currency unit (e.g., paise for INR)
  currency: "INR",
  receipt: "order_receipt_11",
});
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Errors**

   - Verify your MongoDB URL is correct
   - Check if your IP address is whitelisted in MongoDB Atlas
   - Ensure the database user has the correct permissions

2. **Cloudinary Connection Issues**

   - Verify your Cloudinary credentials in the .env file
   - Check if your account has the necessary permissions

3. **Razorpay Instance Errors**
   - Ensure both RAZORPAY_KEY and RAZORPAY_SECRET are defined in your .env file
   - Verify credentials are valid in the Razorpay dashboard

### Debugging Tips

- Check console logs for error messages highlighted in red
- Ensure all environment variables are correctly set
- Verify network connectivity to external services

# Edusphare Email Templates Documentation

This document provides an overview of the email templates used in the Edusphare EdTech platform. These templates are designed to maintain a consistent brand identity and provide clear communication with users.

## Table of Contents

- [Overview](#overview)
- [Templates](#templates)
  - [Course Enrollment Confirmation](#course-enrollment-confirmation)
  - [OTP Verification](#otp-verification)
  - [Password Update Confirmation](#password-update-confirmation)
- [Usage Guidelines](#usage-guidelines)
- [Styling](#styling)
- [Maintenance](#maintenance)

## Overview

The email templates are built using HTML and CSS inline styling for maximum email client compatibility. Each template follows a consistent structure and design language to ensure brand consistency across all communications.

## Templates

### Course Enrollment Confirmation

**File:** `server/src/mail/templates/courseEnrollmentEmail.js`

**Purpose:** Confirms user enrollment in a specific course and provides access to the learning dashboard.

**Parameters:**

- `courseName` (string): The name of the course the user has enrolled in
- `name` (string): The user's name

**Example Usage:**

```javascript
import { courseEnrollmentEmail } from "../mail/templates/courseEnrollmentEmail";

const emailContent = courseEnrollmentEmail("Advanced JavaScript", "John Doe");
// Use emailContent with your email sending service
```

### OTP Verification

**File:** `server/src/mail/templates/emailVerificationTemplate.js`

**Purpose:** Sends a one-time password to verify the user's email address during registration.

**Parameters:**

- `otp` (string/number): The one-time password generated for verification

**Example Usage:**

```javascript
import { otpTemplate } from "../mail/templates/emailVerificationTemplate";

const emailContent = otpTemplate("123456");
// Use emailContent with your email sending service
```

**Note:** The OTP is valid for 5 minutes as stated in the email template.

### Password Update Confirmation

**File:** `server/src/mail/templates/passwordUpdate.js`

**Purpose:** Confirms that a user's password has been successfully updated and provides security information.

**Parameters:**

- `email` (string): The user's email address
- `name` (string): The user's name

**Example Usage:**

```javascript
import { passwordUpdated } from "../mail/templates/passwordUpdate";

const emailContent = passwordUpdated("user@example.com", "John Doe");
// Use emailContent with your email sending service
```

## Usage Guidelines

1. **Import the template:** Import the specific template you need from its file location.
2. **Provide the required parameters:** Pass the necessary parameters to the template function.
3. **Use the returned HTML:** The template function returns a complete HTML string that can be passed to your email sending service.

## Styling

All templates share a common styling approach:

- **Color Scheme:**

  - Primary background: `#ffffff` (white)
  - Call-to-action: `#FFD60A` (yellow)
  - Text: `#333333` (dark gray)
  - Support text: `#999999` (light gray)

- **Typography:**

  - Font family: Arial, sans-serif
  - Base font size: 16px
  - Line height: 1.4
  - Headings and important information use bold styling

- **Layout:**
  - Container width: 600px maximum
  - Centered content
  - Responsive design

## Maintenance

When updating or creating new email templates, maintain consistency by:

1. Following the established structure and styling
2. Using the same color scheme and typography
3. Ensuring all links are fully qualified URLs
4. Testing templates across various email clients
5. Keeping inline CSS for maximum compatibility

For any questions or issues with these templates, please contact the development team.

# Authentication Middleware

## Overview

This module provides authentication and authorization middleware for Node.js applications using JSON Web Tokens (JWT). It ensures secure access control by verifying tokens and restricting routes based on user roles.

## Features

- Extracts JWT from cookies, request body, or authorization headers.
- Validates and decodes JWT to authenticate users.
- Role-based authorization to restrict access to specific user types.
- Custom error handling for token validation and role authorization.

## Installation

Ensure you have `jsonwebtoken` and `dotenv` installed:

```sh
npm install jsonwebtoken dotenv
```

## Usage

### Import the Middleware

```javascript
import { auth, isStudent, isInstructor, isAdmin } from "./auth.middleware.js";
```

### Protect Routes with Authentication

```javascript
app.get("/protected-route", auth, (req, res) => {
  res.json({ message: "You have accessed a protected route!", user: req.user });
});
```

### Role-Based Authorization

```javascript
app.post("/instructor-only", auth, isInstructor, (req, res) => {
  res.json({ message: "Only Instructors can access this route!" });
});
```

## Middleware Details

### Authentication Middleware

```javascript
export const auth = async (req, res, next) => {
  try {
    const token = getTokenFromReq(req);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Token is missing. Please log in." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
  }
};
```

### Role-Based Authorization

```javascript
export const authorizeRoles =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user?.accountType)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Only ${roles.join(
          " or "
        )} can access this route.`,
      });
    }
    next();
  };
```

## Environment Variables

Create a `.env` file in your project root and add:

```
JWT_SECRET=your_secret_key_here
```

## Error Handling

- **401 Unauthorized**: Missing, invalid, or expired token.
- **403 Forbidden**: User lacks the necessary role to access a route.
- **500 Internal Server Error**: Unexpected issues during validation.

# EduSphere API Documentation

## Overview

EduSphere is a comprehensive e-learning platform API providing endpoints for course management, user authentication, payment processing, and profile management. This documentation covers all available API routes with their respective access controls.

---

## API Reference

### Authentication & User Management

| Endpoint           | Method | Description                   | Permissions   |
| ------------------ | ------ | ----------------------------- | ------------- |
| `/login`           | POST   | User login                    | Public        |
| `/signup`          | POST   | User registration             | Public        |
| `/send-otp`        | POST   | Send OTP for verification     | Public        |
| `/change-password` | POST   | Update user password          | Authenticated |
| `/reset-token`     | POST   | Generate password reset token | Public        |
| `/reset`           | POST   | Reset password using token    | Public        |

---

### Course Management

#### Course Operations (Instructor Only)

| Endpoint       | Method | Description        | Permissions | Parameters      |
| -------------- | ------ | ------------------ | ----------- | --------------- |
| `/course`      | POST   | Create new course  | Instructor  | -               |
| `/courses`     | GET    | Get all courses    | Public      | -               |
| `/courses/:id` | GET    | Get course details | Public      | `id`: Course ID |

#### Section & Subsection Management

| Endpoint       | Method | Description       | Permissions |
| -------------- | ------ | ----------------- | ----------- |
| `/section`     | POST   | Create section    | Instructor  |
| `/section`     | PUT    | Update section    | Instructor  |
| `/section`     | DELETE | Delete section    | Instructor  |
| `/sub-section` | POST   | Create subsection | Instructor  |
| `/sub-section` | PUT    | Update subsection | Instructor  |
| `/sub-section` | DELETE | Delete subsection | Instructor  |

---

### Category Management (Admin Only)

| Endpoint                  | Method | Description          | Permissions | Parameters                |
| ------------------------- | ------ | -------------------- | ----------- | ------------------------- |
| `/category`               | POST   | Create category      | Admin       | -                         |
| `/categories`             | GET    | List all categories  | Public      | -                         |
| `/categories/:categoryId` | GET    | Get category details | Public      | `categoryId`: Category ID |

---

### Ratings & Reviews (Students Only)

| Endpoint                            | Method | Description          | Permissions | Parameters            |
| ----------------------------------- | ------ | -------------------- | ----------- | --------------------- |
| `/rating`                           | POST   | Submit rating/review | Student     | -                     |
| `/courses/:courseId/average-rating` | GET    | Get average rating   | Public      | `courseId`: Course ID |
| `/courses/:courseId/reviews`        | GET    | Get all reviews      | Public      | `courseId`: Course ID |

---

### Payment Processing

| Endpoint           | Method | Description              | Permissions      |
| ------------------ | ------ | ------------------------ | ---------------- |
| `/capturePayment`  | POST   | Initiate payment         | Student          |
| `/verifySignature` | POST   | Verify payment signature | Public (Webhook) |

---

### Profile Management

| Endpoint            | Method | Description            | Permissions   |
| ------------------- | ------ | ---------------------- | ------------- |
| `/delete`           | DELETE | Delete user account    | Authenticated |
| `/update`           | PATCH  | Update profile details | Authenticated |
| `/details`          | GET    | Get user details       | Authenticated |
| `/enrolled-courses` | GET    | Get enrolled courses   | Authenticated |
| `/update-picture`   | PUT    | Update profile picture | Authenticated |

---

## Notes

1. **Authentication**: All routes marked as "Authenticated" require a valid JWT token in the request headers.
2. **Role-Based Access Control**:
   - **Instructors**: Can create/update courses, sections, and subsections.
   - **Students**: Can submit ratings and initiate payments.
   - **Admins**: Can manage categories.
3. Use dynamic parameters such as `:id` or `:courseId` for resource-specific actions.
4. Payment verification (`/verifySignature`) is designed for webhook integration.

---

# Image and Mail Handling Utilities

## Overview

This project provides utility functions for handling image uploads to Cloudinary and sending emails using Nodemailer. It includes:

- `imageUploader.js`: A utility to upload images to Cloudinary.
- `mailSender.js`: A utility to send emails using Nodemailer.

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed. Then, install the required dependencies:

```sh
npm install
```

Or manually install the required packages:

```sh
npm install cloudinary chalk nodemailer dotenv
```

## Configuration

This project uses environment variables to manage credentials. Create a `.env` file in your project root and add the following:

```sh
MAIL_HOST=smtp.example.com
MAIL_USER=your_email@example.com
MAIL_PASS=your_password
```

For Cloudinary, configure your credentials:

```sh
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Usage

### Image Uploader

The `imageUploader.js` module uploads images to Cloudinary.

#### Import the module:

```js
import { uploadImageToCloudinary } from "./imageUploader";
```

#### Call the function:

```js
const result = await uploadImageToCloudinary(file, "my-folder", 500, 80);
console.log(result);
```

#### Parameters:

- `file`: The image file to upload.
- `folder`: The Cloudinary folder where the image should be stored.
- `height` (optional): Resize image height.
- `quality` (optional): Adjust image quality.

### Mail Sender

The `mailSender.js` module sends emails using Nodemailer.

#### Import the module:

```js
import { mailSender } from "./mailSender";
```

#### Call the function:

```js
await mailSender(
  "recipient@example.com",
  "Subject Here",
  "<h1>Email Body</h1>"
);
```

#### Parameters:

- `email`: Recipient's email address.
- `title`: Email subject.
- `body`: HTML content of the email.

## Error Handling

Both modules include error handling with meaningful console logs:

- Invalid input handling for Cloudinary uploads.
- SMTP authentication failure logs for email sending.
