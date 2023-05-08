const mongoose = require("mongoose");

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

accountSchema.pre("save", function () {
  this.accountNumber =
    this.contactNumber * 100 + Math.trunc(Math.random() * 100) + 1;
  this.pin = this.DOB.getFullYear();
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
