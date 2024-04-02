const express = require("express");
const authRoutes = express.Router();
const { userSignUp , userSignIn , googleAuthSignIn} = require("../Controllers/authControllers.js");

authRoutes.post("/signup",userSignUp)
authRoutes.post("/signin",userSignIn)
authRoutes.post("/google",googleAuthSignIn)

module.exports = authRoutes