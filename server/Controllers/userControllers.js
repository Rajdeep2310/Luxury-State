const User = require("../Models/User");

const userTestApi = (req,res) =>{
    res.status(200).json({message:"Everything is fine...(testapi)"})
}


module.exports ={
    userTestApi
}