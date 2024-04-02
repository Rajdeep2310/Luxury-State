const express = require("express");
const authRoutes = express.Router();
const { userSignUp , userSignIn} = require("../Controllers/authControllers.js");

authRoutes.post("/signup",userSignUp)
authRoutes.post("/signin",userSignIn)

module.exports = authRoutes