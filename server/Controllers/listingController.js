const Listing = require("../Models/Listing");
const errorHandler = require("../utils/errorHandler")

const createListing = async (req,res,next) =>{
    try{
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    }catch(error){
        next(error);
    }
}

const deleteListing = async(req,res,next) =>{
    try{
        const listing = await Listing.findById(req.params.id)
        if(!listing) return next(errorHandler(404,"Listing not found.."))
        if(req.user.id !== listing.userRef) return next(errorHandler(401,"You can delete your listings only..."))
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Listing deleted succesfully...."})
    }catch(error){
        next(error)
    }
}
const editListing = async(req,res,next) =>{
    try{
        const listing = await Listing.findById(req.params.id)
        if(!listing) return next(errorHandler(404,"Listing not found.."))
        if(req.user.id !== listing.userRef) return next(errorHandler(401,"You can update your listings only..."))
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body,{new:true})
        res.status(200).json(updatedListing)
    }catch(error){
        next(error)
    }
}



module.exports = {
    createListing,
    deleteListing,
    editListing
}