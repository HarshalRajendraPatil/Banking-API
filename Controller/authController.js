// Requiring all the important files and packages
const newUser = require("./../Model/newUserModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

//------------------------------------------------------------------------------------------//

// Method so that only logged-in user can only access the routes
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
