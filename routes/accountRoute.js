const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")


/* ****************************************
*  Deliver login view
* *************************************** */
router.get("/login", utilities.handleErrors(accountController.buildLogin))


async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
    })
  }
  
  module.exports = { buildLogin }