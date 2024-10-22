const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

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

    // creating new instance of User model
    const user = new User(userObj);

    try{
        await user.save();
        res.send("User added successfully");
    }catch(err){
        res.status(400).send("Error saving the user : " + err.message);
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
app.patch("/user", async (req, res) => {
    const data = req.body;
    try{
        const userBeforeUpdate = await User.findByIdAndUpdate(data.id, data, {returnDocument: "before"});
        console.log(userBeforeUpdate);
        res.send("User updated successfully");
    }catch(err) {
        res.status(400).send("Something went wrong");
    }
});

// update a value by email
app.patch("/userUpdateByEmail", async (req, res) => {
    const data = req.body;
    try{
        const userAfterUpdate = await User.findOneAndUpdate({email: data.email}, data, {returnDocument: "after"});
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
