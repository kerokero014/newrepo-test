const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const { handleErrors, checkLogin } = require("../utilities")
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
);

// Route for login
router.get("/log-in", utilities.handleErrors(accountController.buildLogin));

/************************** 
//Route for management account
/**************************/
router.get(
  "/",
  checkLogin,
  handleErrors(accountController.buildAccount)
);

/**
 * Activity 5
 */

// Route to build account login view
router.get(
  "/edit/:account_id",
  handleErrors(accountController.buildEditAccount)
);

// Process the updated account information
router.post(
  "/accountupdate",
  regValidate.updateAccountRules(),
  regValidate.checkEditAccountData,
  handleErrors(accountController.editAccountInfo)
);

// Process the account password change
router.post(
  "/changepassword",
  regValidate.changePasswordRules(),
  regValidate.checkEditAccountData,
  handleErrors(accountController.editAccountPassword)
)

// logout route
router.get("/logout", utilities.handleErrors(accountController.logoutAccount));

module.exports = router;
