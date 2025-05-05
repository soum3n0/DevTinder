const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { corsOrigin, PORT } = require("./constraints");
const http = require("http");
const initializeSocket = require("./utils/socket");
const path = require("path");

// middleware for all the route handler as path is not defined
// convert to json
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: corsOrigin, credentials: true }));
dotenv.config();


const authRouter = require("./Routes/auth");
const profileRouter = require("./Routes/profile");
const requestRouter = require("./Routes/request");
const userRouter = require("./Routes/user");
const chatRouter = require("./Routes/chat");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

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

const server = http.createServer(app);

initializeSocket(server);

connectDB()
    .then(() => {
        console.log("Database connected");
        server.listen(PORT, "0.0.0.0", () => {
            console.log("Connected to server");
        });
    })
    .catch((err) => {
        console.error("Database is not connected");
    });
