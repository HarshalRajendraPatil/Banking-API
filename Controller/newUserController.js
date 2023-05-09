// Requiring all the important files and packages
const newUser = require("./../Model/newUserModel");
const jwt = require("jsonwebtoken");

//------------------------------------------------------------------------------------------//

// create and return the jsonwebtoken to the signedin or loggedin user
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

//------------------------------------------------------------------------------------------//

// method to sign-in the user
exports.signin = async (req, res, next) => {
  const user = await newUser.create(req.body);

  createSendToken(user, 201, res);
};

// method to log-in the user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return console.log("Please enter email or password");
  }
  // 2) Check if user exists && password is correct
  const user = await newUser.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return console.log("Incorrect email or password");
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
};
