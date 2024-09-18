// // Function to show the login popup
// function showLoginPopup() {
//   var popup = document.getElementById("popup1");
//   var loginPopup = document.getElementById("container");

//   if (popup && loginPopup) {
//     popup.style.display = "block";
//     HideSidebar();
//   }
// }

// // Function to close the login popup
// function closeLoginPopup(event) {
//   var popup = document.getElementById("popup1");
//   var popupContent = document.getElementById("container");

//   if (popup && popupContent) {
//     var clickedInsidePopup = popupContent.contains(event.target);
//     var clickedOnLoginButton = event.target.closest(".loginButton");

//     if (!clickedInsidePopup && !clickedOnLoginButton) {
//       popup.style.display = "none";
//     }
//   }
// }

// // Event listener to show the popup on click
// document.addEventListener("DOMContentLoaded", function () {
//   var triggerElements = document.getElementsByClassName("loginButton");

//   for (var i = 0; i < triggerElements.length; i++) {
//     triggerElements[i].addEventListener("click", showLoginPopup);
//   }
// });

// // Event listener to close the popup when clicking outside of it
// document.addEventListener("click", closeLoginPopup);

// document.addEventListener("DOMContentLoaded", function () {
//   var signUpButton = document.getElementById("signButt");

//   if (signUpButton) {
//     signUpButton.addEventListener("click", function () {
//       window.location.href = "signup.html";
//     });
//   }
// });

const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// window.onload = function () {
//   const urlParams = new URLSearchParams(window.location.search);
//   console.log("URL Params:", urlParams.toString()); // Log URL params
//   if (urlParams.get("signup") === "failed") {
//     container.classList.add("right-panel-active-fast");
//     console.log("Conditions met, popup should show.");
//   } else {
//     console.log("Conditions not met.");
//   }
// };

// const signUpButton1 = document.getElementById("signin1");
// signUpButton.addEventListener("click", () => {
//   container.classList.add("right-panel-active-fast");
// });
