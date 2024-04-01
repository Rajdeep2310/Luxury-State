const express = require("express");
const colors = require("colors")
const app = express();


app.get("/health",(req,res) =>{
    res.status(200).json({message:"Everything is fine..."})
})
app.listen(3000,()=>{
    console.log(`Server is running on port 3000...`.bgBlue)
})