const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}


//Assingment #3

invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getInventoryByInvId(inv_id)
  const grid = await utilities.buildVehicleGrid(data)
  let nav = await utilities.getNav()
  const vehicleMake = data[0].inv_make
  const vehicleModel = data[0].inv_model
  const vehicleYear = data[0].inv_year
  const vehicleColor = data[0].inv_color
  // view -- vehicle.ejs
  res.render("./inventory/vehicle", {
    title: vehicleYear + ' ' + vehicleMake + ' ' + vehicleModel + ' ' +vehicleColor,
    nav,
    grid,
    errors: null,
  })
}


invCont.buildBrokenPage = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/broken", {
    title: 'Ops, error',
    nav,
    errors: null,
  })
}

/*****************
  Assingment 4# 
  Building the Managment view 
******************/
invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  const classSelect = await utilities.getClassSelect()
  // view -- management.ejs
  res.render("./inventory/management", {
    title: 'Inventory Management',
    nav,
    errors: null,
    classSelect,
  })
}

/**
 * Build Add classification view
 */
invCont.buildAddclass = async function (req, res, next) {
  let nav = await utilities.getNav()
  // view -- addclass.ejs
  res.render("./inventory/addclass", {
    title: 'Add Classification',
    nav,
    errors: null,
  })
}

invCont.addClass = async function (req, res, next) {
  const { classification_name } = req.body
  
  const regResult = await invModel.addClass(
    classification_name
  )
  let nav = await utilities.getNav()
  let classSelect = await utilities.getClassSelect()
  
  if (regResult) {
    req.flash(
      "success",
      "Classification added"
    )
    res.status(200).render("./inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
      classSelect,
    })
  } else {
    req.flash("error", "Class addition failed")
    res.status(501).render("./inventory/addclass", {
      title: "Add Classification",
      nav,
      errors: null,
    })
  }
}

/**
 * Build add vehicle view 
 **/
invCont.buildAddvehicle = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classSelect = await utilities.getClassSelect()
  // view -- addvehicle.ejs
  res.render("./inventory/addvehicle", {
    title: 'Add Vehicle',
    nav,
    errors: null,
    classSelect,
  })
}

/**
 *  Add Vehicle once in Add Vehicle page 
 */
invCont.addVehicle = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classSelect = await utilities.getClassSelect()
  const { classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = req.body

  const regResult = await invModel.addVehicle(
    classification_id, 
    inv_make, 
    inv_model, 
    inv_year, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_miles, 
    inv_color
  )

  if (regResult) {
    req.flash(
      "success",
      "Vehicle added"
    )
    res.status(201).render("./inventory/management", {
      title: "Inventory Management",
      nav,
      errors: null,
      classSelect,
    })
  } else {
    req.flash("error", "Vehicle addition failed")
    res.status(501).render("./inventory/addvehicle", {
      title: "Add Vehicle",
      nav,
      classSelect,
      errors: null,
    })
  }
}

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}


/* ***************************
 *  Deliver editvehicle view with current vehicle data
 * ************************** */
invCont.buildVehicleEdit = async function (req, res, next) {
  let nav = await utilities.getNav()
  const inv_id = parseInt(req.params.inv_id)
  let invData = (await invModel.getInventoryByInvId(inv_id))[0]
  let classSelect = await utilities.getClassSelect(invData.classification_id)
  let name = `${invData.inv_make} ${invData.inv_model}`
  // view -- editvehicle.ejs
  res.render("./inventory/editVehicle", {
    title: "Edit " + name,
    nav,
    errors: null,
    classSelect: classSelect,
    inv_make: invData.inv_make, 
    inv_model: invData.inv_model, 
    inv_year: invData.inv_year, 
    inv_description: invData.inv_description, 
    inv_image: invData.inv_image, 
    inv_thumbnail: invData.inv_thumbnail, 
    inv_price: invData.inv_price, 
    inv_miles: invData.inv_miles, 
    inv_color: invData.inv_color,
    inv_id: invData.inv_id,
  })
}

/* ***************************
  *  Update Vehicle Data
  * ************************** */
invCont.updateVehicle = async function (req, res, next) {
  let nav = await utilities.getNav()
  const { 
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    inv_id
  } = req.body

  const updateResult = await invModel.updateVehicle(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
    inv_id
  )

  if (updateResult) {
    const itemName = `${updateResult.inv_make} ${updateResult.inv_model}`
    const classSelect = await utilities.getClassSelect(classification_id)

    req.flash("success", `${itemName} was successfully updated`)
    res.status(201).render("./inventory/management", {
      title: "Inventory Management",
      nav,
      errors: null,
      classSelect,
    })
  } else {
    const classSelect = await utilities.getClassSelect(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("error", "Sorry, the insert failed.")
    res.status(501).render("./inventory/editVehicle", {
      title: "Edit " + itemName,
      nav,
      errors: null,
      classSelect: classSelect,
      inv_make, 
      inv_model, 
      inv_year, 
      inv_description, 
      inv_image, 
      inv_thumbnail, 
      inv_price, 
      inv_miles, 
      inv_color,
      inv_id,
    })
  }
}



module.exports = invCont
