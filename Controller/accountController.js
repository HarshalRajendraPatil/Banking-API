const Account = require("./../Model/accountModel");

exports.createAccount = async (req, res, next) => {
  const acc = await Account.create(req.body);

  res.status(201).json({
    status: "Success",
    data: {
      account: acc,
    },
  });
};
