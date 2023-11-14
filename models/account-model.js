const pool = require("../database/");

/* *****************************
*   Register new account
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password){
  try {
    const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
    return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
  } catch (error) {
    return error.message
  }
}

/* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEmail(account_email) {
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1";
    const email = await pool.query(sql, [account_email]);
    return email.rowCount;
  } catch (error) {
    return error.message;
  }
}


/* *****************************
* Return account data using email address
* ***************************** */
async function getAccountByEmail (account_email) {
  try {
    const result = await pool.query(
      'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1',
      [account_email])
    return result.rows[0]
  } catch (error) {
    return new Error("No matching email found")
  }
}


//  *   Account Login
//  * *************************************** */
// async function loginAccount(req, res) {
//   let nav = await utilities.getNav();
//   const { account_email, account_password } = req.body;
//   const account = await accountModel.getAccountByEmail(account_email);
//   if (account) {
//     const match = await bcrypt.compareSync(
//       account_password,
//       account.account_password
//     );
//     if (match) {
//       req.session.user = {
//         id: account.account_id,
//         email: account.account_email,
//         type: account.account_type,
//       };
//       req.flash("success", "You are now logged in.");
//       res.redirect("/");
//     } else {
//       req.flash("error", "Login failed.");
//       res.status(401).render("account/log-in", {
//         title: "Login",
//         nav,
//       });
//     }
//   } else {
//     req.flash("error", "Login failed.");
//     res.status(401).render("account/log-in", {
//       title: "Login",
//       nav,
//     });
//   }
// }
//



module.exports = { registerAccount, checkExistingEmail, getAccountByEmail };
