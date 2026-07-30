const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Read Authorization Header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Token format: Bearer xxxxxxxxx
    const token = authHeader.split(" ")[1];

    // Verify Token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "cdac-secret-key",
    );

    // Store user details in request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = authMiddleware;
