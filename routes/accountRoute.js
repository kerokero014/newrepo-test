const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities");
const regValidate = require("../utilities/account-validation");
const accountModel = require("../models/account-model")

/* ****************************************
 *  Deliver login view
 * *************************************** */
router.get("/log-in", utilities.handleErrors(accountController.buildLogin));

// Resgitration route
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
);

// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  handleErrors(accountController.accountLogin)
);

module.exports = router;
