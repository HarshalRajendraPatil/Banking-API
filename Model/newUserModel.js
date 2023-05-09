// Requiring all the important files and packages.
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

//------------------------------------------------------------------------------------------//

// Defining the schema for users
const newUserSchmea = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide your email"],
    lowerCase: true,
    unique: [true, "User already exists"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    maxLength: [8, "Password should be at least of 8 characters."],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
});

//------------------------------------------------------------------------------------------//

// Using middleware and static methods on schema
newUserSchmea.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

newUserSchmea.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//------------------------------------------------------------------------------------------//

// Creating new user model
const newUser = mongoose.model("newUser", newUserSchmea);

//------------------------------------------------------------------------------------------//

// Exporting the model
module.exports = newUser;
