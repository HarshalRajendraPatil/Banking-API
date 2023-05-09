// Requiring all the important packages
const express = require("express");
const userController = require("./../Controller/newUserController");
const accountController = require("./../Controller/accountController");
const authController = require("./../Controller/authController");
const router = express.Router();

//------------------------------------------------------------------------------------------//

//Route for sign-in
router.route("/signin").post(userController.signin);

//------------------------------------------------------------------------------------------//

// Route for log-in
router.route("/login").post(userController.login);

//------------------------------------------------------------------------------------------//

// Route for creating a bank account
router
  .route("/createAccount")
  .post(authController.protect, accountController.createAccount);

//------------------------------------------------------------------------------------------//

// Route for getting, updating and deleting account details
router
  .route("/myaccount/:id")
  .get(authController.protect, accountController.getAccountDetails)
  .patch(authController.protect, accountController.updateAccountDetails)
  .delete(authController.protect, accountController.deleteAccount);

//------------------------------------------------------------------------------------------//

// Route for depositing, withdrawing money from account
router
  .route("/:id/deposit")
  .post(authController.protect, accountController.depositMoney);
router
  .route("/:id/withdraw")
  .post(authController.protect, accountController.withdrawMoney);

//------------------------------------------------------------------------------------------//

// Route for taking loans
router.route("/:id/loan").post(authController.protect, accountController.loan);

//------------------------------------------------------------------------------------------//

// Exporting the router
module.exports = router;
