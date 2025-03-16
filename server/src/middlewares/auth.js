import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

// 🔐 Authentication Middleware
export const auth = async (req, res, next) => {
    try {
        // 🔹 Extract token from cookies, body, or Authorization header
        const token = 
            req.cookies?.token || 
            req.body?.token || 
            req.headers["authorization"]?.split(" ")[1];

        // 🔹 If token is missing, send error response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing. Please log in.",
            });
        }

        // 🔹 Verify the token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Attach user data to request
            next();
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: err.name === "TokenExpiredError" 
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

// 🔹 Student Role Middleware
export const isStudent = (req, res, next) => {
    try {
        if (req.user?.accountType !== "Student") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Only students can access this route.",
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

// 🔹 Instructor Role Middleware
export const isInstructor = (req, res, next) => {
    try {
        if (req.user?.accountType !== "Instructor") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Only instructors can access this route.",
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

// 🔹 Admin Role Middleware
export const isAdmin = (req, res, next) => {
    try {
        console.log("🔍 Checking AccountType:", req.user?.accountType);
        if (req.user?.accountType !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Only admins can access this route.",
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
