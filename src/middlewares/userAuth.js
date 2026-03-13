const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const createError = require("../utils/createError.js");

const userAuth = async (req, res, next)=>{
    try{
        const {token} = req.cookies;
        const SAFE_USER_DATA = ["firstName", "lastName", "age", "gender", "about", "photourl", "skills"];
        if(!token){
            throw createError(400, "Token not found");
        }
        const decoded = jwt.verify(token, "DevTinder@123#");
        const user = await User.findById(decoded._id).select(SAFE_USER_DATA);
        if(!user){
            throw createError(400, "Please login first");
        }
        req.user = user;
        next();
    } catch(err){
        res.status(err.statusCode || 500).json({
            message: err.message,
            data: err.data
        });
    }
}

module.exports = userAuth;