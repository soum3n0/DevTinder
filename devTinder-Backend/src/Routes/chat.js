const express = require("express");
const chatRouter = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const Chat = require("../models/chat");

chatRouter.get("/fetch/messages/:targetUserId", userAuth, async (req, res) => {
    const { targetUserId } = req.params;
    const senderId = req.user._id;

    try {
        const response = await Chat.find({
            participants: { $all: [senderId, targetUserId] },
        });
        const messages = response[0]?.messages;
        res.json(messages || []);
    } catch (err) {
        console.error(err);
    }
});

module.exports = chatRouter;
