// Requiring all the important files and packages
const Account = require("./../Model/accountModel");

//------------------------------------------------------------------------------------------//

// Method to create bank account for logged-in users
exports.createAccount = async (req, res, next) => {
  const acc = await Account.create(req.body);

  res.status(201).json({
    status: "Success",
    data: {
      account: acc,
    },
  });
};

//------------------------------------------------------------------------------------------//

// Method to get the details of the bank account
exports.getAccountDetails = async (req, res, next) => {
  const acc = await Account.findById(req.params.id).select("-pin -__v -_id");

  if (!acc) return console.log("No account found! Please create one.");

  res.status(200).json({
    status: "Success",
    data: {
      account: acc,
    },
  });
};

//------------------------------------------------------------------------------------------//

// Method to update the details of the bank account
exports.updateAccountDetails = async (req, res, next) => {
  const acc = await Account.findByIdAndUpdate(req.params.id, req.body);

  if (!acc)
    return console.log(
      "No account found to update the details! Please create one."
    );

  res.status(200).json({
    status: "Success",
    message: "Account Successfully updated",
  });
};

//------------------------------------------------------------------------------------------//

// Method to delete the bank account
exports.deleteAccount = async (req, res, next) => {
  const acc = await Account.findByIdAndDelete(req.params.id, req.body);

  if (!acc)
    return console.log("No account found to be deleted! Please create one.");

  res.status(204).json({
    status: "Success",
    message: "Account deleted",
  });
};

//------------------------------------------------------------------------------------------//

// Method for Depositing the money
exports.depositMoney = async (req, res, next) => {
  const acc = await Account.findById(req.params.id);
  const amount = req.body.amount;
  if (!acc)
    return console.log("Cannot deposit money before creating an account");

  if (!amount) return console.log("Please provide amount to be deposited");

  const newAmount = acc.amount + amount;

  await Account.findByIdAndUpdate(req.params.id, {
    amount: newAmount,
  });

  res.status(200).json({
    status: "Success",
    data: {
      newAmount,
    },
  });
};

//------------------------------------------------------------------------------------------//

// Method for withdrawing money from account
exports.withdrawMoney = async (req, res, next) => {
  const acc = await Account.findById(req.params.id);
  const amount = req.body.amount;
  if (!acc)
    return console.log("Cannot withdraw money before creating an account");

  if (!amount) return console.log("Please enter the amount to be withdrawn.");

  if (acc.amount < req.body.amount) {
    return console.log("Insufficient funds");
  }

  const newAmount = acc.amount - amount;

  await Account.findByIdAndUpdate(req.params.id, {
    amount: newAmount,
  });

  res.status(200).json({
    status: "Success",
    data: {
      newAmount,
    },
  });
};

// Method for taking the loan
exports.loan = async (req, res, next) => {
  const acc = await Account.findById(req.params.id);
  const amount = req.body.amount;
  if (!acc)
    return console.log("Cannot approve loan without creating an account");

  if (!amount)
    return console.log("Please provide the amount of loan you need.");

  const newAmount = acc.amount + amount;

  await Account.findByIdAndUpdate(req.params.id, {
    amount: newAmount,
  });

  res.status(200).json({
    status: "Success",
    message: `You will have to pay ${((amount * 1.1) / 12).toFixed(
      2
    )} per month to repay the loan with in a year`,
    data: {
      newAmount,
    },
  });
};

//------------------------------------------------------------------------------------------//
