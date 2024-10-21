const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
    const userObj = {
        firstName : "Kousik",
        lastName : "Dey",
        email : "kousik@gmail.com",
        password : "Kousik@123",
        gender : 'M'
    };

    const user = new User(userObj);

    try{
        await user.save();
        res.send("User added successfully");
    }catch(err){
        res.status(400).send("Error saving the user : " + err.message);
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
