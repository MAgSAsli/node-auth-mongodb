const express = require('express');
const authmiddleware = require('../middlewares/authMiddleware');
const User = require("../models/User");

const {
    getUsers,
    getUserById,
    createUser,
    deleteUser

} = require(`../controllers/usercontroller`);

const router = express.Router();

router.get("/profile", authmiddleware, async (req, res)  => {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
});

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.delete("/:id", deleteUser);

module.exports = router;
