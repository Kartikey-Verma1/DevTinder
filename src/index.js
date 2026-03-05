const express = require("express");
const connectDB = require("./config/database.js");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/connectionRequest.js");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

app.use("/", (req, res)=>{
    res.status(400).send("something went wrong");
})

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