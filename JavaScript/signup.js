document.addEventListener("DOMContentLoaded", () => {
  const signUpForm = document.querySelector("#signupForm"); // Form ID
  const errors1 = document.querySelector("#errors"); // Form ID

  signUpForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the input values
    const fullName = document.querySelector("input[name='fullName']").value;
    const phoneNumber = document.querySelector(
      "input[name='phoneNumber']"
    ).value;
    const email = document.querySelector("input[name='email']").value;
    const pwd = document.querySelector("input[name='pwd']").value;
    console.log(fullName, phoneNumber, email, pwd);

    if (isNaN(phoneNumber) || !Number.isInteger(parseFloat(phoneNumber))) {
      errors1.innerHTML = "Please enter a valid phone number (numbers only).";
      return; // Stop the form from submitting
    }

    // Send data via fetch to the server
    fetch("includes/signup.inc.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
        pwd: pwd, // Make sure it matches PHP's 'password' key
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          errors1.innerHTML = data.message; // Show success message
          window.location.href = "./register.php"; // Redirect to a relevant page
        } else {
          if (data.errors) {
            // Display individual validation errors
            let errorMessages = [];
            for (const error in data.errors) {
              errorMessages.push(data.errors[error]); // Add each error message to the array
            }
            // Join and display all error messages
            errors1.innerHTML = errorMessages.join("<br>");
          } else {
            errors1.innerHTML = data.message; // Generic failure message
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        errors1.innerHTML = "An error occurred while signing up.";
      });
  });
});
