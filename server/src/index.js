import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";

// Import Configurations
import connectDB from "./config/database.config.js";
import cloudinaryConnect from "./config/cloudinary.config.js";

// Import Routes
import authRoutes from "./routes/user.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import courseRoutes from "./routes/course.routes.js";
import paymentRoutes from "./routes/payments.routes.js";

// Load Environment Variables
dotenv.config();

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Connect to Database
connectDB();

// ✅ Middlewares
app.use(express.json()); 
app.use(cookieParser()); 
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// ✅ File Upload Middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// ✅ Connect to Cloudinary
cloudinaryConnect();

// ✅ API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

// ✅ Default Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Server is up and running!",
  });
});

// ✅ Start the Server
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
