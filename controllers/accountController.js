
const utilities = require('../utilities')


/* ****************************************
*  Deliver login view
* *************************************** */

async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/log-in", {
    title: "Login",
    nav,
  })
}
  
module.exports = { buildLogin }