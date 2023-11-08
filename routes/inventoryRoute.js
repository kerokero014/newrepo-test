// Needed Resources
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities");
const invController = require("../controllers/invController");
const { handleErrors, checkAuthorization } = require("../utilities");

// Route to build inventory by classification view
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
);

// #3
// Route to build inventory by vehicle view
router.get(
  "/detail/:invId",
  utilities.handleErrors(invController.buildByInvId)
);

//#3
router.get("/broken", utilities.handleErrors(invController.buildBrokenPage));

//Route to build inventory index
router.get("/", handleErrors(invController.buildManagement))

// Process the new classification data
router.get(
  "/addclass", handleErrors(invController.buildAddclass)
)


module.exports = router;
