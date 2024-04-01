const express = require("express");
const authRoutes = express.Router();
const { userSignUp } = require("../Controllers/authControllers.js");

authRoutes.post("/signup",userSignUp)

module.exports = authRoutes