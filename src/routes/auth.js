const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const validator = require("validator");

const authRouter = express.Router();

authRouter.post("/authProfile/signup", async (req, res)=>{
    const {firstName, lastName, email, password, age, gender, about, skills, photourl} = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        age,
        gender,
        about,
        skills,
        photourl
    });
    try{
        await user.save();
        res.send("user added successfully!");
    } catch (err){
        res.status(400).send(`Something Went Wrong...: ${err.message}`);
    }
});

authRouter.post("/authProfile/login", async (req, res)=>{
    try{
        const {email, password} = req.body;
        if(!validator.isEmail(email)){
            throw new Error("Enter valid email");
        }
        const user = await User.findOne({email: email});
        if(!user){
            throw new Error("User not registered");
        }
        
        const isPasswordValid = await user.verifyPassword(password);
        if(!isPasswordValid){
            throw new Error("Wrong email or password");
        }

        const token = await user.getJWT();
        res.cookie("token", token);
        res.send(`${user.firstName} ${user.lastName} Logged In!`);
    } catch(err){
        res.status(400).send(`Something Went Wrong...: ${err.message}`);
    }
});

module.exports = authRouter;