const express = require("express");
const userController = require("./../Controller/newUserController");
const accountController = require("./../Controller/accountController");
const router = express.Router();

router.route("/signin").post(userController.signin);
router.route("/login").post(userController.login);

router
  .route("/createAccount")
  .post(userController.protect, accountController.createAccount);

module.exports = router;
