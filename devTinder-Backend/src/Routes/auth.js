const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const validator = require("validator");

const { validateSignUpData } = require("../utils/validate");
const User = require("../models/user");

const isProduction = process.env.NODE_ENV === "production";

authRouter.post("/signup", async (req, res) => {
    // const userObj = {
    //     firstName : "Kousik",
    //     lastName : "Dey",
    //     email : "kousik@gmail.com",
    //     password : "Kousik@123",
    //     gender : 'M'
    // };

    // dynamic data
    const userObj = req.body;

    try {
        // validate the data
        validateSignUpData(userObj);

        // encryption
        userObj.password = await bcrypt.hash(userObj.password, 10);

        // creating new instance of User model
        const user = new User(userObj);

        await user.save();
        const token = await user.getJWT();
        res.cookie("token", token, {
            expires: new Date(Date.now() + 7 * 24 * 3600000),
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "None" : "Lax",
        });
        res.status(201).json({ message: "User added successfully", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!validator.isEmail(email)) {
            throw new Error("Email is not valid");
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isPasswordMatch = await user.validatePassword(password);
        if (isPasswordMatch) {
            const token = await user.getJWT();
            res.cookie("token", token, {
                expires: new Date(Date.now() + 7 * 24 * 3600000),
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? "None" : "Lax",
            });
            res.json({ message: "Login successful", user });
        } else {
            res.cookie("token", null, { expires: new Date(0), httpOnly: true });
            throw new Error("Invalid credentials");
        }
    } catch (err) {
        res.status(400).json({ error: `ERROR : ${err.message}` });
    }
});

authRouter.post("/logout", async (req, res) => {
    try {
        res.cookie("token", null, { expires: new Date(0), httpOnly: true });
        res.json({ message: "Logout successfull" });
    } catch (err) {
        res.status(400).json({ error: `ERROR : ${err.message}` });
    }
});

module.exports = authRouter;
