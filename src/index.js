const express = require("express");
const connectDB = require("./config/database.js");
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("./models/user.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {userAuth} = require("./middlewares/userAuth.js");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res)=>{
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

app.post("/login", async (req, res)=>{
    try{
        const {email, password} = req.body;
        if(!validator.isEmail(email)){
            throw new Error("Enter valid email");
        }
        const user = await User.findOne({email: email});
        if(!user){
            throw new Error("User not registered");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw new Error("Wrong email or password");
        }
        const token = jwt.sign({_id: user._id}, "DevTinder@123#", {
            expiresIn: "1d",
        });
        res.cookie("token", token);
        res.send(`${user.firstName} ${user.lastName} Logged In!`)
    } catch(err){
        res.status(400).send(`Something Went Wrong...: ${err.message}`);
    }
});

app.get("/profile", userAuth, async (req, res)=>{
    try{
        res.send(req.user);
    } catch (err){
        res.status(400).send(`Something Went Wrong...: ${err.message}`);
    }
});

connectDB()
.then(()=>{
    console.log("Database is connected successfully...");
    app.listen(3000, ()=>{
        console.log("server is running on port 3000");
    });

})
.catch((err)=>{
    console.error(`Database connection failed...: ${err.message}`);
});