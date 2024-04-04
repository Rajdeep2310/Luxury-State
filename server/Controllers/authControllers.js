const User = require("../Models/User");
const bcrypt = require("bcrypt");
const errorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");

const userSignUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User Created Succesfully...." });
  } catch (error) {
    next(error);
  }
};

const userSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validUser = await User.findOne({ email });
    // Finding if user exists or not:
    if (!validUser) {
      return next(errorHandler(404, "User Not Found..."));
    }
    //coparing bcrypt passwords
    const validPassword = bcrypt.compareSync(password, validUser.password);
    //checking if password is valid or not
    if (!validPassword) {
      return next(errorHandler(404, "Wrond Credentials..."));
    }
    // creating token here:
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // this line is uesed to remove password from coming as output of user as it not a good practice to  show password
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const googleAuthSignIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // creating token here:
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      // this line is uesed to remove password from coming as output of user as it not a good practice to  show password
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      // we have genrate password here because google OAuth doesnt pass pasword to our db and password in model is required as true:
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      // creating token here:
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      // this line is uesed to remove password from coming as output of user as it not a good practice to  show password
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

const userSignout = async(req,res,next) =>{
  try{
    res.clearCookie('access_token');
    res.status(200).json({message:"User has been logged out !"})
  }catch(error){
    next(error);
  }
}
module.exports = {
  userSignUp,
  userSignIn,
  googleAuthSignIn,
  userSignout
};
