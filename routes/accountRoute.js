const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities");
const regValidate = require("../utilities/account-validation");

// Route for login
router.get("/log-in", utilities.handleErrors(accountController.buildLogin));

//Route for register
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
);

//Process the registration data
//router.post(
//  "/register",
//  regValidate.registationRules(),
//  regValidate.checkRegData,
//  handleErrors(accountController.registerAccount)
//)

// Process the login attempt
router.post("/login", (req, res) => {
  res.status(200).send("login process");
});

module.exports = router;
