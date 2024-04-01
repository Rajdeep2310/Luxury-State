const User = require("../Models/User");
const bcrypt = require('bcrypt');

const userSignUp = async(req,res,next) =>{
    try{
        const {username , email , password} = req.body;
        const hashedPassword = bcrypt.hashSync(password,10);
        const newUser = new User({username , email , password : hashedPassword});
        await newUser.save();
        res.status(201).json({message:"User Created Succesfully...."})
    }catch(error){ 
        next(error);
    }
}

module.exports ={
    userSignUp
}