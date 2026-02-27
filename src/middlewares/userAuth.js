const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const userAuth = async (req, res, next)=>{
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("Token not found...");
        }
        const decoded = jwt.verify(token, "DevTinder@123#");
        const user = await User.findById(decoded._id);
        if(!user){
            throw new Error("Please login first...");
        }
        req.user = user;
        next();
    } catch(err){
        res.status(400).send(`${err}`);
    }
}

module.exports = {userAuth};