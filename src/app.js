const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validate");
const bcrypt = require("bcrypt");
const validator = require("validator");

// middleware for all the route handler as path is not defined
app.use(express.json());

app.post("/signup", async (req, res) => {
    // const userObj = {
    //     firstName : "Kousik",
    //     lastName : "Dey",
    //     email : "kousik@gmail.com",
    //     password : "Kousik@123",
    //     gender : 'M'
    // };

    // dynamic data
    const userObj = req.body;

    try{
        // validate the data
        validateSignUpData(userObj);

        // encryption
        userObj.password = await bcrypt.hash(userObj.password, 10);

        // creating new instance of User model
        const user = new User(userObj);

        await user.save();
        res.send("User added successfully");
    }catch(err){
        res.status(400).send("Error saving the user : " + err.message);
    }
});

app.post("/login", async (req, res) => {
    const {email, password} = req.body;

    try{
        if(!validator.isEmail(email)){
            throw new Error("Email is not valid");
        }

        const user = await User.findOne({email: email});

        if(!user){
            throw new Error("Invalid credintial");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(passwordMatch){
            res.send("Login successful");
        }else{
            throw new Error("Invalid credintial");
        }
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});

// find a user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.email;
    try{
        const user = await User.findOne({email: userEmail});
        if(user.length === 0) {
            res.status(404).send("User not found");
        }else{
            res.send(user);
        }
    }catch(err){
        res.status(400).send("Something went wrong");
    }
});

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

// update a value by id
app.patch("/user/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const ALLOWED_UPDATES = ["password", "gender", "age", "skills"];
    try{
        // data sanitization
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        if(data?.skills.length > 10){
            throw new Error("Skills can not be more than 10");
        }
        const userBeforeUpdate = await User.findByIdAndUpdate(id, data, {returnDocument: "before", runValidators: true});
        console.log("User before update => " + userBeforeUpdate);
        res.send("User updated successfully");
    }catch(err) {
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

connectDB().then(()=>{
    console.log("Databae connected");
    app.listen(3000, ()=>{
        console.log("Connected to server");
    })
}).catch((err)=>{
    console.error("Database is not connected");
})
