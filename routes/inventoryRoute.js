// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
// #3
router.get("/detail/:inv_id", invController.buildByClassificationId);

// Route to build inventory by vehicle view
router.get("/detail/:invId", invController.buildByInvId);




module.exports = router;
