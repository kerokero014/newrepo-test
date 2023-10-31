document.addEventListener("DOMContentLoaded", function() {
  const pswdBtn = document.getElementById("pswdBtn");
  pswdBtn.addEventListener("click", function() {
    const pswdInput = document.getElementById("accountPassword_pword");
    const type = pswdInput.getAttribute("type");
    if (type === "password") {
      pswdInput.setAttribute("type", "text");
      pswdBtn.textContent = "Hide Password";
    } else {
      pswdInput.setAttribute("type", "password");
      pswdBtn.textContent = "Show Password";
    }
  });
});
