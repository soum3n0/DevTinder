const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://soumen0dey22:dPAVrMNDTAW7X4fq@cluster0.rzqpy.mongodb.net/devTinder");
}

module.exports = connectDB;