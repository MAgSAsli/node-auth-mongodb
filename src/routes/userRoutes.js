const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/User");

const {
  getUsers,
  getUserById,
  createUser,
  deleteUser
} = require("../controllers/userController");

// 🔐 Protected route
router.get("/profile", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

// CRUD user
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.delete("/:id", deleteUser);

module.exports = router;
