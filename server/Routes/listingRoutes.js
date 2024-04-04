const express = require("express");
const listingRoutes = express.Router();
const { createListing } = require("../Controllers/listingController");
const verifyToken = require("../utils/verifyToken");

listingRoutes.post("/create",verifyToken,createListing)

module.exports = listingRoutes ;