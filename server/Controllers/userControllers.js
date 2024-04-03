const User = require("../Models/User");
const errorHandler = require("../utils/errorHandler");
const bcrypt = require("bcrypt");

//TestAPI 
const userTestApi = (req,res) =>{
    res.status(200).json({message:"Everything is fine...(testapi)"})
}

// Updating a user Info----> <ProfileComponent/>
const updateUserInfo = async(req,res,next) =>{
    try{
        if(req.user.id !== req.params.id) return next(errorHandler(401,"You can only update your own profile..."));
        if(req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password,10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar
            }
        },{new:true})

        const { password ,...rest} = updatedUser._doc;
        res.json(rest).status(200)
    }catch(error){
        next(error);
    }
}

module.exports ={
    userTestApi,updateUserInfo
}