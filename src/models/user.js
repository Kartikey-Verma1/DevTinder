const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 15,
        trim: true,
    },
    lastName: {
        type: String,
        minLength: 4,
        maxLength: 15,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        immutable: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please enter valid email...");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Weak Password Try Again...");
            }
        }
    },
    age: {
        type: Number,
        max: 60,
        min: 16
    },
    gender: {
        type: String,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender not defined...");
            }
        }
    },
    about: {
        type: String,
        default: "Hey there! I am on DevTinder.",
        trim: true,
        maxLength: 100,
    },
    skills: {
        type: [String],
        lowercase: true,
        trim: true,
        validate(value){
            if(value.length > 20){
                throw new Error("Number of skills exceedes limit of 20");
            }
        }
    },
    photourl:{
        type: String,
        default: "https://www.vhv.rs/viewpic/ioJThwo_men-profile-icon-png-image-free-download-searchpng/",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Enter valid url");
            }
        }
    }
}, {
    timestamps: true,
});

userSchema.methods.getJWT = async function () {
    const token = await jwt.sign({_id: this._id}, "DevTinder@123#", {
        expiresIn: "1d"
    });
    return token;
};

userSchema.methods.verifyPassword = async function (password) {
    const isValid = await bcrypt.compare(password, this.password);
    return isValid;
};
const User = mongoose.model("User", userSchema);

module.exports = User;