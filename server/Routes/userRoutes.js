const express = require("express");
const userRoutes = express.Router();
const { userTestApi } = require("../Controllers/userControllers.js");

userRoutes.get("/health",userTestApi)

module.exports = userRoutes