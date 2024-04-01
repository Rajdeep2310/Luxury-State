const express = require("express");
const colors = require("colors")
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRoutes = require("./Routes/userRoutes");
dotenv.config();
mongoose.connect(process.env.MONGO).then(() =>{
    console.log(`Connected to MongoDB...`.bgGreen);
}).catch((err) =>{
    console.log(err)
});
app.listen(3000,()=>{
    console.log(`Server is running on port 3000...`.bgBlue)
})

//---------- Routes for Users ------------

app.use("/api/user", userRoutes);