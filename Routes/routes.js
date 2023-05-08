const express = require("express");
const Controller = require("./../Controller/newUserController");
const router = express.Router();

router.route("/signin").post(Controller.protect, Controller.signin);
router.route("/login").post(Controller.login);

module.exports = router;
