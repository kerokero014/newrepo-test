// Needed Resources
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities");
const invController = require("../controllers/invController");
const { handleErrors } = require("../utilities");
const invValidate = require("../utilities/invValidation");

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
router.get("/", handleErrors(invController.buildManagement));

// Process the new classification data
router.get("/addclass", handleErrors(invController.buildAddclass));

router.post(
  "/addclass",
  invValidate.classRules(),
  invValidate.checkClassData,
  handleErrors(invController.addClass)
);

// Route to build add vehicle view
router.get("/addvehicle", handleErrors(invController.buildAddvehicle));

// Process the new vehicle data
router.post(
  "/addvehicle",
  invValidate.vehicleRules(),
  invValidate.checkVehicleData,
  handleErrors(invController.addVehicle)
);

// Build inventory management table inventory view
router.get(
  "/getInventory/:classification_id",
  handleErrors(invController.getInventoryJSON)
);

// Build edit vehicle information view
router.get("/edit/:inv_id", handleErrors(invController.buildVehicleEdit));

// Post route /update
router.post("/update", handleErrors(invController.updateVehicle));

// Build delete vehicle view
router.get("/delete/:inv_id", handleErrors(invController.buildVehicleDeleteConfirm));


// Post route /delete
router.post("/delete", handleErrors(invController.deleteVehicle));



// Build delete classification view
//router.get(
//  "/deleteclass/:classification_id",
//  handleErrors(invController.buildClassDelete)
//);


module.exports = router;
