const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validate");
const bcrypt = require("bcrypt");

const cookieParser = require("cookie-parser");
const {userAuth} = require("./middlewares/userAuth");

// middleware for all the route handler as path is not defined
// convert to json
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./Routes/auth");
const profileRouter = require("./Routes/profile");
const requestRouter = require("./Routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


/*
// get all users
app.get("/feed", async (req, res) => {
    try{
        const users = await User.find({});
        if(users.length === 0){
            res.status(404).send("No user found");
        }
        res.send(users);   
    }catch(err){
        res.status(400).send("Something went wrong");
    }
});


// update a value by email
app.patch("/userUpdateByEmail", async (req, res) => {
    const data = req.body;
    try{
        if(data?.skills.length > 10){
            throw new Error("Skills can not be more than 10");
        }
        const userAfterUpdate = await User.findOneAndUpdate({email: data.email}, data, {returnDocument: "after", runValidators: true});
        console.log(userAfterUpdate);
        res.send("User updated successfully");
    }catch(err) {
        res.status(400).send("Something went wrong");
    }
});

// delete a user data
app.delete("/user", async (req, res) =>{
    const id = req.body.id;
    try{
        await User.findByIdAndDelete(id);
        res.send("User deleted successfully");
    }catch(err) {
        res.status(400).send("Something went wrong");
    }
});
*/

connectDB().then(()=>{
    console.log("Database connected");
    app.listen(3000, ()=>{
        console.log("Connected to server");
    })
}).catch((err)=>{
    console.error("Database is not connected");
})
