const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      validate: {
        validator: function (value) {
          // Password validation regex
          const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          return passwordRegex.test(value);
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      },
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    phone: {
      type: String,
      match: [/^\d{10}$/, "Please enter a valid phone number"],
    },
    addresses: [
      {
        line: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        zip: { type: String, required: true },
      },
    ],
    avatar: {
      type: String,
      default: "https://example.com/default-avatar.jpg",
    },
    otp: {
      type: String, // For OTP during password reset
    },
    otpExpiration: {
      type: Date, // Expiry of OTP
    },
  },
  { timestamps: true }
);

// Encrypt password before saving the user
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const saltRounds = process.env.SALT_ROUNDS || 10; // Retrieve salt rounds from .env file, default to 10 if not set
  this.password = await bcrypt.hash(this.password, parseInt(saltRounds));

  next();
});

// Method to compare password during login
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Optionally clear OTP once used or expired
UserSchema.methods.clearOtp = async function () {
  this.otp = undefined;
  this.otpExpiration = undefined;
  await this.save();
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
