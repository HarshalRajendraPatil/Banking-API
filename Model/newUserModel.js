const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

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

const newUser = mongoose.model("newUser", newUserSchmea);

module.exports = newUser;
