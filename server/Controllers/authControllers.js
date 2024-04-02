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
    const { password: pass , ...rest} = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  userSignUp,
  userSignIn,
};

