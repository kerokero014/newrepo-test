const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const handleErrors = require("../utilities");
const utilities = require("../utilities");
const regValidate = require("../utilities/account-validation");



//Route for register
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
);

//Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

// Process the login attempt
router.post(
  "/log-in",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

// Route for login
router.get("/log-in", utilities.handleErrors(accountController.buildLogin));

/************************** 
//Route for management account
/**************************/ 
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildAccount));


/**
 * Activity 5 
 */
////Route for logout
//router.get("/log-out", utilities.handleErrors(accountController.accountLogout));
////Route for edit account
//router.get("/edit", utilities.checkLogin, utilities.handleErrors(accountController.buildEditAccount));




module.exports = router;
