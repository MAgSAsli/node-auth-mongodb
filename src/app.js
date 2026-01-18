const express = require('express');
const cors = require('cors');
const UserRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");
const authRoutes = require("./routes/authRoutes")


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
    res.json({
        message: "Percobaan pertama berhasil"
    });
});

app.use("/api/users", UserRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

module.exports = app;