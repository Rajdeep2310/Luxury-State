const express = require("express");
const userRoutes = express.Router();
const { userTestApi ,updateUserInfo, userInfoDelete} = require("../Controllers/userControllers.js");
const verifyToken  = require("../utils/verifyToken.js")

userRoutes.get("/health",userTestApi)
userRoutes.post("/update/:id",verifyToken,updateUserInfo)
userRoutes.delete("/delete/:id", verifyToken ,userInfoDelete)
module.exports = userRoutes