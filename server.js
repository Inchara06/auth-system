require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const authRoutes = require("./routes/authRoutes");

app.use("/api", authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});