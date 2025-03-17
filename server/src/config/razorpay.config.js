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
            console.error(chalk.red("❌ Missing Razorpay API credentials in .env file"));
            process.exit(1);
        }

        razorpayInstance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        console.log(chalk.green("✅ Razorpay Instance Created Successfully"));
        return razorpayInstance;
    } catch (error) {
        console.error(chalk.red("❌ Razorpay Instance Creation Failed:"), error.message);
        process.exit(1);
    }
};

export default getRazorpayInstance