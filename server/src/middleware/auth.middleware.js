import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT token and attach user details to request object
const checkRole = async (req, res, next, role) => {
  try {
    if (!req.user || req.user.role !== role) {
      return res
        .status(401)
        .json({ message: "Access denied. No user found or incorrect role." });
    }
    next();
  } catch (error) {
    console.log(chalk.red(`Role Check Error for ${role}:`, error));
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Middleware to authenticate JWT token
export const authenticateToken = (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    // Verify JWT token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ message: "Token expired. Please log in again." });
        }
        return res.status(403).json({ message: "Invalid token." });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log(chalk.red("Authentication Error:", error));
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Middleware to check Student role
export const isStudent = async (req, res, next) =>
  checkRole(req, res, next, "student");

// Middleware to check Teacher role
export const isTeacher = async (req, res, next) =>
  checkRole(req, res, next, "teacher");

// Middleware to check Admin role
export const isAdmin = async (req, res, next) =>
  checkRole(req, res, next, "admin");
