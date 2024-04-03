const express = require("express");
const userRoutes = express.Router();
const { userTestApi ,updateUserInfo} = require("../Controllers/userControllers.js");
const verifyToken  = require("../utils/verifyToken.js")

userRoutes.get("/health",userTestApi)
userRoutes.post("/update/:id",verifyToken,updateUserInfo)

module.exports = userRoutes