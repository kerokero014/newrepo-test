const invModel = require("../models/inventory-model");
const Util = {};
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications();
  let list = "<ul>";
  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    list += "<li>";
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>";
    list += "</li>";
  });
  list += "</ul>";
  return list;
};

/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid = "";
  if (data.length > 0) {
    grid = `<ul id="inv-display">
      ${data
        .map(
          (vehicle) => `
        <li>
          <a href="../../inv/detail/${vehicle.inv_id}" title="View ${
            vehicle.inv_make
          } ${vehicle.inv_model} details">
            <img src="${vehicle.inv_thumbnail}" alt="Image of ${
            vehicle.inv_make
          } ${vehicle.inv_model} on CSE Motors" />
          </a>
          <div class="namePrice">
            <hr />
            <h2>
              <a href="../../inv/detail/${vehicle.inv_id}" title="View ${
            vehicle.inv_make
          } ${vehicle.inv_model} details">
                ${vehicle.inv_make} ${vehicle.inv_model}
              </a>
            </h2>
            <span>$${new Intl.NumberFormat("en-US").format(
              vehicle.inv_price
            )}</span>
          </div>
        </li>
      `
        )
        .join("")}
    </ul>`;
  } else {
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};

//Assingment3 - Single Car view
Util.buildVehicleGrid = async function (data) {
  let grid = "";
  if (data.length > 0) {
    let vehicle = data[0];
    grid = `
      <div id="singleVehicleWrapper">
        <img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_year} ${
      vehicle.inv_make
    } ${vehicle.inv_model}">
        <ul id="singleVehicleDetails">
          <li><h2>${vehicle.inv_make} ${vehicle.inv_model} Details</h2></li>
          <li><strong>Price: </strong>$${new Intl.NumberFormat("en-US").format(
            vehicle.inv_price
          )}</li>
          <li><strong>Description: </strong>${vehicle.inv_description}</li>
          <li><strong>Color: </strong>${vehicle.inv_color}</li>
          <li><strong>Miles: </strong>${new Intl.NumberFormat("en-US").format(
            vehicle.inv_miles
          )}</li>
        </ul>
      </div>`;
  } else {
    grid = '<p class="notice">Sorry, no matching vehicle could be found.</p>';
  }
  return grid;
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

  
Util.buildBrokenPage = function(){
  let broken = ''
  return broken
}

/* ************************
 * Constructs the classification HTML select options
 ************************** */
Util.getClassSelect = async function (selectedOption) {
  let data = await invModel.getClassifications()
  let options = `<option value="">Choose a classification</option>`
  data.rows.forEach((row => {
    options += 
      `<option value="${row.classification_id}"
      ${row.classification_id === Number(selectedOption) ? 'selected': ''}>
      ${row.classification_name}
      </option>`
  }))
  return options
}

/* ************************
 * Constructs the account HTML select options
 ************************** */
Util.getAccountSelect = async function (selectedOption) {
  let data = await accountModel.getAccounts()
  let options = `<option value="">Select a Recipient</option>`
  data.rows.forEach((row => {
    options += 
      `<option value="${row.account_id}"
      ${row.account_id === Number(selectedOption) ? 'selected': ''}>
      ${row.account_firstname} ${row.account_lastname}
      </option>`
  }))
  return options
}

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
   jwt.verify(
    req.cookies.jwt,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, accountData) {
     if (err) {
      req.flash("Please log in")
      res.clearCookie("jwt")
      return res.redirect("/account/login")
     }
     res.locals.accountData = accountData
     res.locals.loggedin = 1
     next()
    })
  } else {
   next()
  }
 }

module.exports = Util;
