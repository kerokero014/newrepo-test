// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Get the password input element
  var passwordInput = document.getElementById('accountPassword pword');
  // Get the "Show password" button
  var showPasswordButton = document.getElementById('pswdBtn').getElementsByTagName('button')[0];

  // Add click event listener to the button
  showPasswordButton.addEventListener('click', function () {
    // Check the type of the password input
    if (passwordInput.type === 'password') {
      // If it's currently a password field, change it to text
      passwordInput.type = 'text';
      // Change the button text to 'Hide password'
      showPasswordButton.textContent = 'Hide password';
    } else {
      // If it's currently a text field, change it to password
      passwordInput.type = 'password';
      // Change the button text to 'Show password'
      showPasswordButton.textContent = 'Show password';
    }
  });
});
