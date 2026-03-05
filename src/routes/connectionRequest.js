const express = require("express");
const userAuth = require("../middlewares/userAuth.js");

const requestRouter = express.Router();

requestRouter.post("/connectionRequest/send/interested/:userId", userAuth, async (req, res)=>{
    try{
        res.send("request send...");
    }
    catch (err){
        res.status(400).send(`Error: ${err.message}`);
    }
});

module.exports = requestRouter;