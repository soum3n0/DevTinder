const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("User not logged in");
        }
        const {_id} = await jwt.verify(token, "abC@123");
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not present");
        }
        req.user = user;
        next();
    }catch(err){
        res.status(400).json({ error : err.message });
    }
};

module.exports = {userAuth};