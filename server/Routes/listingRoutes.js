const express = require("express");
const listingRoutes = express.Router();
const { createListing , deleteListing } = require("../Controllers/listingController");
const verifyToken = require("../utils/verifyToken");

listingRoutes.post("/create",verifyToken,createListing)
listingRoutes.delete("/delete/:id",verifyToken,deleteListing)

module.exports = listingRoutes ;