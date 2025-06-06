const { verifyToken } = require("../utils/jwtUtil");

// Middleware to check if the user is authenticated
const protect = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: "Token is invalid or expired" });
  }

  req.user = decoded; // Attach user info to the request object
  console.log(req.user);
  next();
};

// Middleware to check if the user has an admin role
// const isAdmin = (req, res, next) => {
//   if (req.user?.role !== "admin") {
//     return res.status(403).json({ message: "Access denied, admin only" });
//   }
//   next();
// };
// Middleware to check if the user has an admin role
const isAdmin = (req, res, next) => {
  // Ensure the user is authenticated and their role is available
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  // Check if the user has the "admin" role
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, admin only" });
  }

  // If the user is an admin, proceed to the next middleware or route handler
  next();
};

module.exports = { protect, isAdmin };
