// Requiring all the important files and packages
const Transaction = require("./../Model/transactionModel");
const Account = require("./../Model/accountModel");

//------------------------------------------------------------------------------------------//

// Creating the function for transferring the money
exports.transferMoney = async (req, res, next) => {
  const moneyFrom = await Account.findOne({ accountNumber: req.params.accNum });
  if (!moneyFrom) {
    return console.log(
      "Please create an account before transferring the money"
    );
  }

  const moneyTo = await Account.findOne({ accountNumber: req.body.transferTo });
  if (!moneyTo) {
    return console.log("No account found with the given account number.");
  }

  if (!req.body.amount) {
    return console.log("Please provide the amount to be transfered.");
  }

  const amountDeducted = moneyFrom.amount - req.body.amount;
  const amountAdded = moneyTo.amount + req.body.amount;

  await Account.findOne({ accountNumber: req.params.accNum }).updateOne({
    amount: amountDeducted,
  });

  await Account.findOne({ accountNumber: req.body.transferTo }).updateOne({
    amount: amountAdded,
  });

  const details = {
    transferedFrom: req.params.accNum,
    transferedTo: req.body.transferTo,
    amount: req.body.amount,
  };

  const transactionDetails = await Transaction.create(details);

  res.status(200).json({
    Status: "Success",
    data: {
      details: transactionDetails,
    },
  });
};

//------------------------------------------------------------------------------------------//

// Creating the function for getting the transaction history of the account
exports.transactionHistory = async (req, res, next) => {
  const history = await Transaction.find({ transferedFrom: req.params.accNum });

  res.status(200).json({
    status: "Success",
    trasactionMade: history.length,
    history: {
      data: history,
    },
  });
};

//------------------------------------------------------------------------------------------//
