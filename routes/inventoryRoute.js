// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities");
const invController = require("../controllers/invController");
const { handleErrors } = require("../utilities");

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
// #3
// Route to build inventory by vehicle view
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInvId));

//#
router.get("/broken", utilities.handleErrors(invController.buildBrokenPage));

module.exports = router;
