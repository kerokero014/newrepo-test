const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")


/* ****************************************
*  Deliver login view
* *************************************** */
router.get("/log-in", utilities.handleErrors(accountController.buildLogin))

// Resgitration route 
router.get("/register", utilities.handleErrors(accountController.buildRegister))



module.exports = router