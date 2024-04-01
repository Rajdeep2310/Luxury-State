const express = require("express");
const colors = require("colors")
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();


mongoose.connect(process.env.MONGO).then(() =>{
    console.log(`Connected to MongoDB...`.bgGreen);
}).catch((err) =>{
    console.log(err)
});

app.get("/health",(req,res) =>{
    res.status(200).json({message:"Everything is fine..."})
})
app.listen(3000,()=>{
    console.log(`Server is running on port 3000...`.bgBlue)
})