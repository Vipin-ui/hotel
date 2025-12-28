

import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
   
    if (!req.auth || !req.auth.userId) {
      console.error("Authentication failed: Clerk session missing or invalid");
      return res.status(401).json({
        success: false,
        message: "Authentication failed: missing or invalid Clerk session",
      });
    }

    const clerkUserId = req.auth.userId;

    // Find user in your database using the Clerk identifier
    const user = await User.findOne({ cler_id: clerkUserId });
    if (!user) {
      console.error(
        `Authentication failed: User not found in DB for ID ${userId}`
      );
      return res.status(401).json({
        success: false,
        message: "Authentication failed: user not found",
      });
    }

    // Attach user to request for downstream controllers
    req.user = user;
    req.userId = user._id.toString();
    console.log(req.user);
    console.log(
      `Authentication successful for userId: ${req.userId} (Clerk: ${clerkUserId})`
    );
    next();
  } catch (error) {
    console.error("Authentication failed due to server error:", error);
    res.status(500).json({
      success: false,
      message: "Authentication failed: server error",
    });
  }
};
