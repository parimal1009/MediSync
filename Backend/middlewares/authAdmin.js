import jwt from "jsonwebtoken";

//admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers; // Get token from headers
    if (!atoken) {
      return res.status(401).json({ success: false, message: "Please login first" });
    }

    // Verify token
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

    // Check if the token payload matches admin email or another identifying property
    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    next(); // If valid, proceed to the next middleware/controller
  } catch (error) {
    console.error("Token validation error:", error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authAdmin;
