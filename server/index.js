const express = require("express");
const colors = require("colors")
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRoutes = require("./Routes/userRoutes");
const authRoutes = require("./Routes/authRoutes");
const listingRoutes = require("./Routes/listingRoutes");
const cookieParser = require("cookie-parser");

dotenv.config();
mongoose.connect(process.env.MONGO).then(() =>{
    console.log(`Connected to MongoDB...`.bgGreen);
}).catch((err) =>{
    console.log(err)
});
app.listen(3000,()=>{
    console.log(`Server is running on port 3000...`.bgBlue)
})

// used to verify token and secure route and check wheter the route has token  or not :
app.use(cookieParser());

app.use(express.json()); 

//---------- Middleware of error ------------
app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || `Internal Server Error.`;
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})

//---------- Routes for Users ------------
app.use("/api/auth",authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/listing", listingRoutes);