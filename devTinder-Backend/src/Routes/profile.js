const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const profileRouter = express.Router();
const { validateProfileUpdateData } = require("../utils/validate");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try{
        res.json(req.user);
    }catch (err) {
        res.status(400).json({ error : err.message});
    }
});

profileRouter.patch("/profile/update/details", userAuth, async (req, res) => {
    try{
        const user = req.user;
        const data = req.body;

        validateProfileUpdateData(data);

        Object.keys(data).every((key) => user[key] = data[key]);
        await user.save();
        res.json({ message : "Update successfull", user});
    }catch (err) {
        res.status(400).json({ error : err.message});
    }
});

profileRouter.patch("/profile/update/password", userAuth, async (req, res) => {
    try{
        const { oldPassword, newPassword } = req.body;
        const user = req.user;

        const isPasswordMatch = await user.validatePassword(oldPassword);
        if(!isPasswordMatch){
            throw new Error("Wrong password");
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: "Password updated successfully" });
    }catch(err){
        res.status(400).json({ error : err.message });
    }
});

profileRouter.delete("/profile/delete", userAuth, async (req, res) => {
    try{
        const user = req.user;
        const { password } = req.body;
        
        const isPasswordMatch = await user.validatePassword(password);
        if(!isPasswordMatch){
            throw new Error("Password incorrect");
        }
        await user.deleteOne();
        res.json({ message: "Profile deleted successfully" });
    } catch(err){
        res.status(500).json({ error : err.message});
    }
});

module.exports = profileRouter;