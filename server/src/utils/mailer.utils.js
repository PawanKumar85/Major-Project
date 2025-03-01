import transporter from "../config/email.config.js";

// Function to configure the mail options
const createMailOptions = (email, subject, body) => ({
  from: "Major Project || by Pawan Kumar <pawan630703@gmail.com>",
  to: email,
  subject: subject,
  html: body,
});

// Send the email
export const sendEmail = async (email, subject, body) => {
  try {
    const mailOptions = createMailOptions(email, subject, body);
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error:", error);
  }
};
