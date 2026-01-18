const express = require('express');
const authmiddleware = require('../middlewares/authMiddleware');

const {
    getUsers,
    getUserById,
    createUser,
    deleteUser

} = require(`../controllers/usercontroller`);

const router = express.Router();

router.get("/profile", authmiddleware, (req, res) => {
    res.json({
        Message: "profile pengguna",
        user: req.user
    });
});

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.delete("/:id", deleteUser);

module.exports = router;
