const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { generateToken } = require("../utils/jwtUtil");

// Register User
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Save user to the database
    const newUser = new User({ email, password });
    await newUser.save();
    const token = generateToken(newUser);
    return res.status(201).json({ message: "User registered successfully",token});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Forgot Password (Generate OTP)
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email does not exist" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiration = Date.now() + 300000; // 5 minutes

    // Log the user object to verify OTP fields
    console.log("User with OTP: ", user);

    // Save the updated user object with OTP and expiration time
    await user.save(); // Make sure to save changes

    // Set up transporter to send the OTP email
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your email service
      auth: {
        user: process.env.EMAIL_USERNAME, // Ensure these are set in your .env file
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email options for sending OTP
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: "Your OTP for Password Reset",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // Log if email was sent successfully
    console.log("OTP email sent: ", info.response);
    // console.log("Email Username:", process.env.EMAIL_USERNAME);
    // console.log("Email Password:", process.env.EMAIL_PASSWORD);
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Check if email, otp, and newPassword are provided
    if (!email || !otp || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email, OTP, and new password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email does not exist" });
    }

    // Check if OTP is valid and hasn't expired
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiration < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Update the password (make sure to hash the password before saving it)
    user.password = newPassword; // You should hash the password before saving it (e.g., using bcrypt)

    // Clear OTP and expiration fields after reset
    user.otp = undefined;
    user.otpExpiration = undefined;

    // Save the user with the new password
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
// Login with Email and Password
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email does not exist" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getInTouch = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Sending email using Nodemailer (optional)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: email,
      to: process.env.EMAIL_USERNAME, // Your email
      subject: `New Contact Form Submission - ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
    console.log("Email Username:", process.env.EMAIL_USERNAME);
    console.log("Email Password:", process.env.EMAIL_PASSWORD);

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Get Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  forgotPassword,
  resetPassword,
  loginUser,
  getInTouch,
  getProfile,
};
