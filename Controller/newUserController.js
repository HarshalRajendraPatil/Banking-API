const newUser = require("./../Model/newUserModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

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

exports.signin = async (req, res, next) => {
  const user = await newUser.create(req.body);

  createSendToken(user, 201, res);
};

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

exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return console.log("Please log in to access this route");
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await newUser.findById(decoded.id);
  if (!currentUser) {
    return console.log("User belonging to this token does not exists");
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
};
