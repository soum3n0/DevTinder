const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middlewares/userAuth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

const filter = "firstName lastName age gender skills";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;
        const receivedRequests = await ConnectionRequestModel.find({
            toUserId : loggedInUser._id,
            status : "like"
        }).populate("fromUserId", filter);

        res.json({message : "Received requests fetch successfully", data : receivedRequests});
    }catch(err){
        res.status(400).json({error : err.message});
    }
});

userRouter.get("/user/requests/sent", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;
        const sentRequests = await ConnectionRequestModel.find({
            fromUserId : loggedInUser._id,
            status: "like"
        }).populate("toUserId", filter);

        res.json({message : "Sent requests fetched successfully", data : sentRequests});
    }catch(err){
        res.status(400).json({error : err.message});
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;
        const allConnections = await ConnectionRequestModel.find({
            $or : [
                {toUserId : loggedInUser._id},
                {fromUserId : loggedInUser._id}
            ],
            status : "accepted"
        }).populate("fromUserId", filter).populate("toUserId", filter);

        const data = allConnections.map(key =>{
            // if(key.fromUserId._id.toString() === loggedInUser._id.toString()){
            if(key.fromUserId._id.equals(loggedInUser._id)){
                return key.toUserId;
            }
            return key.fromUserId;
        })

        res.json({message : "Data fetch successful", data});
    }catch(err){
        res.status(400).json({error : err.message});
    }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        
        if(page < 1)    page = 1;
        if(limit < 1)   limit = 10;
        limit = Math.min(limit, 50);
        const skip = (page - 1) * limit;

        const existingConnection = await ConnectionRequestModel.find({
            $or : [
                {fromUserId : loggedInUser._id},
                {toUserId : loggedInUser._id}
            ],
        }).select("fromUserId toUserId").lean();

        const excludedUsers = new Set();
        excludedUsers.add(loggedInUser._id.toString());
        existingConnection.forEach((user) => {
            excludedUsers.add(user.fromUserId.toString());
            excludedUsers.add(user.toUserId.toString());
        });
        
        const data = await User.find({
            _id : {$nin : Array.from(excludedUsers)}
        }).select(filter).skip(skip).limit(limit).lean();
        
        res.json({message : "User feed successfully fetched", 
            data, 
            pagination : {
                page, 
                limit, 
                hasMore : data.length === limit
            }
        });
    }catch(err){
        res.status(400).json({error : err.message});
    }
});

module.exports = userRouter;