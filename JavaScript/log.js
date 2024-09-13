// Function to show the login popup
function showLoginPopup() {
  var popup = document.getElementById("popup1");
  var loginPopup = document.getElementById("LoginPopup");

  if (popup && loginPopup) {
    popup.style.display = "block";
    HideSidebar(); // Hide the sidebar if it's visible
  }
}

// Function to close the login popup
function closeLoginPopup(event) {
  var popup = document.getElementById("popup1");
  var popupContent = document.getElementById("LoginPopup");

  if (popup && popupContent) {
    var clickedInsidePopup = popupContent.contains(event.target);
    var clickedOnLoginButton = event.target.closest(".loginButton");

    if (!clickedInsidePopup && !clickedOnLoginButton) {
      popup.style.display = "none";
    }
  }
}

// Event listener to show the popup on click
document.addEventListener("DOMContentLoaded", function () {
  var triggerElements = document.getElementsByClassName("loginButton");

  for (var i = 0; i < triggerElements.length; i++) {
    triggerElements[i].addEventListener("click", showLoginPopup);
  }
});

// Event listener to close the popup when clicking outside of it
document.addEventListener("click", closeLoginPopup);

document.addEventListener("DOMContentLoaded", function () {
  var signUpButton = document.getElementById("signButt");

  if (signUpButton) {
    signUpButton.addEventListener("click", function () {
      window.location.href = "signup.html";
    });
  }
});

///////////////////////////////////////
// Tabbed component

const logsign_container = document.querySelector(".logsign_container");
const tabs = document.querySelectorAll(".logsign_button");
const tabsContent = document.querySelectorAll(".logsign_tabs");

logsign_container.addEventListener("click", function (e) {
  const clicked = e.target.closest(".logsign_button");

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach((t) => t.classList.remove("logsign_button_active"));
  tabsContent.forEach((c) => c.classList.remove("logsign_tab_active"));

  // Activate tab
  clicked.classList.add("logsign_button_active");

  // Activate content area
  document
    .querySelector(`.logsign_tab--${clicked.dataset.tab}`)
    .classList.add("logsign_tab_active");
});
