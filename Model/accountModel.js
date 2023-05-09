// Requiring the important files and packages
const mongoose = require("mongoose");

//------------------------------------------------------------------------------------------//

// Defining the account schema
const accountSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your first name."],
  },
  lastName: {
    type: String,
    required: [true, "Please providea your last name."],
  },
  contactNumber: {
    type: Number,
    required: [true, "Please provide your contact number."],
  },
  DOB: {
    type: Date,
    required: [true, "please provide your data of birth."],
  },
  nationality: {
    type: String,
    required: [true, "Please provide your country of risidence."],
  },
  address: {
    type: String,
    required: [true, "Please provide your residence address."],
  },
  occupation: {
    type: String,
    required: [true, "Please provide your occupation."],
  },
  amount: {
    type: Number,
    required: [true, "Please deposit some value in your account"],
  },
  accountNumber: Number,
  pin: Number,
});

//------------------------------------------------------------------------------------------//

// Using middleware to set account number and pin
accountSchema.pre("save", function (next) {
  this.accountNumber =
    this.contactNumber * 100 + Math.trunc(Math.random() * 100) + 1;
  this.pin = this.DOB.getFullYear();
  next();
});

//------------------------------------------------------------------------------------------//

// Creating accounts model
const Account = mongoose.model("Account", accountSchema);

//------------------------------------------------------------------------------------------//

// Exporting the account model
module.exports = Account;
