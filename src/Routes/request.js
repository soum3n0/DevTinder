const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/userAuth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

// like or pass API
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try{
        const toUserId = req.params.toUserId;
        const fromUserId = req.user._id;
        const status = req.params.status;

        const ALLOWED_CONNETION = ["like", "pass"];
        if(!ALLOWED_CONNETION.includes(status)){
            throw new Error(`Invalid status : ${status}`);
        }

        const isConnectionRequestExist = await ConnectionRequest.findOne({
            $or : [
                {fromUserId, toUserId},
                {fromUserId : toUserId, toUserId : fromUserId}
            ]
        });
        if(isConnectionRequestExist){
            return res.status(400).json({error : "Connection Request already exist"});
        }

        const user = await User.findById(toUserId);
        if(!user){
            return res.status(404).json({error : "User not found"});
        }

        const data = new ConnectionRequest({fromUserId, toUserId, status});
        await data.save();
        res.json({ message : "Connection sent successfully", data });
    }catch(err){
        res.status(400).json({error : err.message});
    }
});

// accepted or rejected API
requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try{
        const { status, requestId } = req.params;
        const loggedInUser = req.user;
        const ALLOWED_STATUS = ["accepted", "rejected"];
        if(!ALLOWED_STATUS.includes(status)){
            throw new Error("Invalid status");
        }

        const isConnectionRequestExist = await ConnectionRequest.findOne({
            _id : requestId,
            toUserId : loggedInUser._id,
            status : "like"
        });
        if(!isConnectionRequestExist){
            return res.status(404).json({error : "Requested Connection does not exist"});
        }

        isConnectionRequestExist.status = status;
        await isConnectionRequestExist.save();
        res.json({message : `Successfully ${status}`});
    }catch(err){
        res.status(400).json({error : err.message});
    }
});

module.exports = requestRouter;