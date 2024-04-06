const express = require("express");
const listingRoutes = express.Router();
const { createListing , deleteListing ,editListing} = require("../Controllers/listingController");
const verifyToken = require("../utils/verifyToken");

listingRoutes.delete("/delete/:id",verifyToken,deleteListing)
listingRoutes.post("/update/:id",verifyToken,editListing)
listingRoutes.post("/create",verifyToken,createListing)
module.exports = listingRoutes ;