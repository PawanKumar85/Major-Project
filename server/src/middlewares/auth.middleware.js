import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Helper to extract token from cookies, body, or Authorization header
const getTokenFromReq = (req) =>
  req.cookies?.token ||
  req.body?.token ||
  req.headers["authorization"]?.split(" ")[1];

// 🔐 Authentication Middleware
export const auth = async (req, res, next) => {
  try {
    const token = getTokenFromReq(req);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing. Please log in.",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message:
          err.name === "TokenExpiredError"
            ? "Token has expired. Please log in again."
            : "Invalid token. Authentication failed.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error validating the token. Try again later.",
    });
  }
};

// 🔹 Generic Role Authorization Middleware
export const authorizeRoles =
  (...roles) =>
  (req, res, next) => {
    try {
      if (!roles.includes(req.user?.accountType)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Only ${roles.join(
            " or "
          )} can access this route.`,
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error verifying user role.",
      });
    }
  };

// Usage for specific roles
export const isStudent = authorizeRoles("Student");
export const isInstructor = authorizeRoles("Instructor");
export const isAdmin = authorizeRoles("Admin");
