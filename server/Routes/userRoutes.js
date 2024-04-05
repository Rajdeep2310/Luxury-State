const express = require("express");
const userRoutes = express.Router();
const { userTestApi ,updateUserInfo, userInfoDelete,getUserListing} = require("../Controllers/userControllers.js");
const verifyToken  = require("../utils/verifyToken.js")

userRoutes.get("/health",userTestApi)
userRoutes.post("/update/:id",verifyToken,updateUserInfo)
userRoutes.delete("/delete/:id", verifyToken ,userInfoDelete)
userRoutes.get("/listings/:id", verifyToken ,getUserListing)
module.exports = userRoutes