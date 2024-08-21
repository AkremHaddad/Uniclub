// Function to show the login popup
function showLoginPopup() {
  var popup = document.querySelector(".popup");
  var loginPopup = document.getElementById("LoginPopup");

  // Ensure the elements exist before trying to modify their styles
  if (popup && loginPopup) {
    popup.style.display = "block";
    loginPopup.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var triggerElements = document.getElementsByClassName("logIn"); // Get all elements with class 'logIn'
  for (var i = 0; i < triggerElements.length; i++) {
    triggerElements[i].addEventListener("click", showLoginPopup);
  }
});
