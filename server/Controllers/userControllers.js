const User = require("../Models/User");
const errorHandler = require("../utils/errorHandler");
const bcrypt = require("bcrypt");
const Listing = require("../Models/Listing.js")


//------TestAPI(Health)------
const userTestApi = (req, res) => {
  res.status(200).json({ message: "Everything is fine...(testapi)" });
};

// Updating a user Info----> <ProfileComponent/> <------------

const updateUserInfo = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, "You can only update your own profile..."));
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.json(rest).status(200);
  } catch (error) {
    next(error);
  }
};

// Delete Users' account :
const userInfoDelete = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, "You are Unauthorized"));
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User has been deleted... " });
  } catch (error) {
    res.clearCookie("access_token");
    res.json({ message: "You can delete only your own account" }).status(402);
  }
};

// Getting all user's Listing as per user's ID:
const getUserListing = async(req, res,next) =>{
  if(req.user.id === req.params.id){
    try{
      const listings = await Listing.find({ userRef:req.params.id});
      res.status(200).json(listings)
    }catch(error){
      console.log(error)
      next(error)
    }
  }else{
    return next(errorHandler(401,"You can only create your ow route...."))
  }
}

module.exports = {
  userTestApi,
  updateUserInfo,
  userInfoDelete,
  getUserListing,
  
};
