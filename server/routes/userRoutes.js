import express from "express";
import User from "../models/User.js";

const userRouter = express.Router();

userRouter.post("/create", async (req, res) => {
  try {
    // Destructure data from frontend / Postman body
    const { cler_id, username, email, image, role, recentSearchedCities } = req.body;

    // Create new user in MongoDB
    const user = await User.create({
      cler_id,
      username,
      email,
      image,
      role,
      recentSearchedCities,
    });

    res.json({ message: "✅ User created", user });
  } catch (error) {
    console.error("❌ Error saving user:", error);
    res.status(500).json({ error: error.message });
  }
});

// Danger: deletes every user document; no authentication
userRouter.delete("/delete-all", async (_req, res) => {
  try {
    const result = await User.deleteMany({});
    res.json({
      success: true,
      deletedCount: result.deletedCount,
      message: "All users deleted",
    });
  } catch (error) {
    console.error("❌ Error deleting users:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default userRouter;
