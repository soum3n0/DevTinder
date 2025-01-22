const validator = require("validator");

const validateSignUpData = (obj) => {
    const {password, skills} = obj;
    var errors = [];

    if(password.length < 8 || password.length > 12){
        errors.push("Password should be between 8 and 12 characters");
    }

    const isValid = validator.isStrongPassword(password);
    if(!isValid){
        errors.push("Password should include at least 1 uppercase letter, 1 number, and 1 symbol");
    }

    if(skills && skills.length > 10){
        errors.push("Maximum 10 skills can be added");
    }

    if (errors.length > 0) {
        throw new Error(errors.join(". "));
    }
};

const validateProfileUpdateData = (data) => {
    const ALLOWED_UPDATES = ["firstName", "lastName", "gender", "age", "skills", "about", "photoUrl"];
    const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

    if(!isUpdateAllowed){
        throw new Error("Update not allowed");
    }
    if(data?.skills && data?.skills.length > 10){
        throw new Error("Skills can not be more than 10");
    }
};

module.exports = {validateSignUpData, validateProfileUpdateData};