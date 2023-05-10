// Requiring all the important files and packages
const mongoose = require("mongoose");

//------------------------------------------------------------------------------------------//

// Creating the schema for money trnasfer
const transactionSchema = new mongoose.Schema({
  transferedFrom: {
    type: Number,
    required: [true, "Please provide your account number"],
  },
  transferedTo: {
    type: Number,
    required: [true, "Please provide the account number of the receiver."],
  },
  amount: {
    type: Number,
    required: [true, "Please provide the amount to be transfered"],
  },
  transactionID: Number,
  transferedAt: String,
  transferedOn: Date,
});

//------------------------------------------------------------------------------------------//

transactionSchema.index({ accountNumber: 1 });

// Using pre middleware to get the date, time and transactionId
transactionSchema.pre("save", function (next) {
  this.transferedOn = new Date().toLocaleDateString("en-us", {
    month: "long",
    year: "numeric",
    day: "numeric",
  });
  this.transferedAt = `${new Date()
    .getHours()
    .toString()
    .padStart(2, 0)} - ${new Date()
    .getMinutes()
    .toString()
    .padStart(2, 0)} - ${new Date().getSeconds().toString().padStart(2, 0)}`;
  this.transactionID = Math.trunc(Math.random() * 1000000000000) + 1;
  next();
});

//------------------------------------------------------------------------------------------//

// Creating the transaction model
const Transaction = mongoose.model("Transaction", transactionSchema);

//------------------------------------------------------------------------------------------//

// Exporting the transaction model
module.exports = Transaction;
