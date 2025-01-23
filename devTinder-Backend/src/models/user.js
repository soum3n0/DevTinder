const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { defaultPhotoUrl } = require("../constraints");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            min: 18,
        },
        gender: {
            type: String,
            // validate: function (value){
            //     if(!["M", "F", "O"].includes(value)){
            //         throw new Error("Gender data is not validated");
            //     }
            // }
            enum: {
                values: ["M", "F", "O"],
                message: `{VALUE} is not a valid gender type`,
            },
        },
        email: {
            type: String,
            lowercase: true,
            // index: true,
            unique: true, // unique index - fast searching
            trim: true,
            required: true,
            validate(value) {
                const isValid = validator.isEmail(value);
                if (!isValid) {
                    throw new Error("Email address is not valid");
                }
            },
        },
        password: {
            type: String,
            required: true,
            validate(value) {
                const isValid = validator.isStrongPassword(value);
                if (!isValid) {
                    throw new Error("Password is not strong");
                }
            },
        },
        skills: {
            type: [String],
        },
        about: {
            type: String,
            default: "This is a default update",
        },
        photoUrl: {
            type: String,
            default: defaultPhotoUrl
        }
    },
    { timestamps: true }
);

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "abC@123", {
        expiresIn: "1d",
    });
    return token;
};

userSchema.methods.validatePassword = async function (password) {
    const passwordHash = this.password;
    const isPasswordMatch = await bcrypt.compare(password, passwordHash);
    return isPasswordMatch;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
