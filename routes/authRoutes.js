const express = require("express");

const router = express.Router();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const auth = require("../middleware/auth");

const role = require("../middleware/role");


// REGISTER
router.post("/register", async (req, res) => {

    try {

        const { email, password, role: userRole } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({

            email,

            password: hashedPassword,

            role: userRole || "student"
        });

        await user.save();

        res.send("User Registered Successfully");

    } catch (err) {

        res.status(400).send(err.message);
    }
});


// LOGIN
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).send("User not found");
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {

            return res.status(400).send("Wrong Password");
        }

        const token = jwt.sign(

            {
                id: user._id,
                role: user.role
            },

            process.env.JWT_SECRET
        );

        res.json({ token });

    } catch (err) {

        res.status(500).send(err.message);
    }
});


// ADMIN - VIEW ALL USERS
router.get("/users",

    auth,

    role("admin"),

    async (req, res) => {

        const users = await User.find();

        res.json(users);
    }
);


// ADMIN - DELETE USER
router.delete("/user/:id",

    auth,

    role("admin"),

    async (req, res) => {

        await User.findByIdAndDelete(req.params.id);

        res.send("User Deleted");
    }
);


// STUDENT - VIEW PROFILE
router.get("/profile",

    auth,

    async (req, res) => {

        const user = await User.findById(req.user.id);

        res.json(user);
    }
);


// STUDENT - UPDATE PROFILE
router.put("/profile",

    auth,

    async (req, res) => {

        const updatedUser = await User.findByIdAndUpdate(

            req.user.id,

            req.body,

            { new: true }
        );

        res.json(updatedUser);
    }
);

module.exports = router;