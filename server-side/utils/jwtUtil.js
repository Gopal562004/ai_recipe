const jwt = require("jsonwebtoken");

// Generate a JWT token for a user
const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  // Sign the token with a secret and set its expiration time
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5h" });
};

// Verify the JWT token and extract the user payload
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
