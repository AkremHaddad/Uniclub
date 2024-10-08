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

if (signUpButton) {
  signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });
}

if (signInButton) {
  signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });
}

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

// document.addEventListener("DOMContentLoaded", () => {
//   const login = document.querySelector("#loginForm"); // Form ID
//   const errors1 = document.querySelector("#errors2"); // Form ID

//   login.addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent the default form submission

//     // Get the input values
//     const email = document.querySelector("input[name='email']").value;
//     const pwd = document.querySelector("input[name='pwd']").value;
//     console.log(email, pwd);

//     // Send data via fetch to the server
//     fetch("includes/login.inc.php", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: email,
//         pwd: pwd, // Make sure it matches PHP's 'password' key
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           errors1.innerHTML = data.message; // Show success message
//           window.location.href = "./index.php?login=success"; // Redirect to a relevant page
//         } else {
//           if (data.errors) {
//             // Display individual validation errors
//             let errorMessages = [];
//             for (const error in data.errors) {
//               errorMessages.push(data.errors[error]); // Add each error message to the array
//             }
//             // Join and display all error messages
//             errors1.innerHTML = errorMessages.join("<br>");
//           } else {
//             errors1.innerHTML = data.message; // Generic failure message
//           }
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         errors1.innerHTML = "An error occurred while loging in.";
//       });
//   });
// });
