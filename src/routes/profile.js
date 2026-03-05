const express = require("express");
const userAuth = require("../middlewares/userAuth.js")

const profileRouter = express.Router();

profileRouter.get("/profile/user", userAuth, async (req, res)=>{
    try{
        res.send(req.user);
    } catch (err){
        res.status(400).send(`Something Went Wrong...: ${err.message}`);
    }
});

module.exports = profileRouter;