// Import the required modules
import express from "express";
import { capturePayment, verifySignature } from "../controllers/Payments.controller.js";
import { auth, isInstructor, isStudent, isAdmin } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifySignature", verifySignature);

export default router;
