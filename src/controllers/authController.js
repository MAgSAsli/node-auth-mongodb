const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Pendaftaran pengguna baru
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(401).json({
                message: "Data tidak boleh kosong"
            });
        }

        const userExists = await User.findOne({ email});
        if (userExists) {
            return res.status(401).json({
                message: "Email sudah terdaftar"
            })
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedpassword,
        });

        res.status(201).json({
            message: "user berhasil mendaftar",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        res.status(500).jsn({
            message: "server rusak"
        });
    }
};

// Login pengguna
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email});
        if (!user) {
            return res.status(401).json({
                message: "harap memaskkan email dan password yang benar"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Email atau Password salah"
            });
        }

        const token = jwt.sign(
            {id: user._id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.json({
            message: "Login Berhasil",
            token,
        });
    }catch (err) {
        res.status(500).json({
            message: "server rusak"
        });
    }
};