const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    age : {
        type: Number,
        min: 18,
    },
    gender : {
        type: String,
        validate: function (value){
            if(!["M", "F", "O"].includes(value)){
                throw new Error("Gender data is not validated");
            }
        }
    },
    email : {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        required: true,
        validate(value){
            const isValid = validator.isEmail(value);
            if(!isValid){
                throw new Error("Email address is not valid");
            }
        }
    },
    password : {
        type: String,
        required: true,
        validate(value){
            const isValid = validator.isStrongPassword(value);
            if(!isValid){
                throw new Error("Password is not strong");
            }
        }
    },
    skills: {
        type: [String],
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;