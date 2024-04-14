const express = require("express");
const listingRoutes = express.Router();
const { createListing , deleteListing ,editListing , getListing} = require("../Controllers/listingController");
const verifyToken = require("../utils/verifyToken");

listingRoutes.delete("/delete/:id",verifyToken,deleteListing)
listingRoutes.post("/create",verifyToken,createListing)
listingRoutes.post("/update/:id",verifyToken,editListing)
listingRoutes.get("/get/:id", getListing)

module.exports = listingRoutes ;