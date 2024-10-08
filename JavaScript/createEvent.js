document
  .getElementById("post_event")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get values from input fields
    const title = document.getElementById("event_title").value;
    const details = document.getElementById("details").value;
    const eventDate = document.getElementById("eventDate").value;
    const eventPhotoInput = document.getElementById("event_image_input");
    const eventPhoto =
      eventPhotoInput.files.length > 0 ? eventPhotoInput.files[0] : null; // Optional photo

    // Validate inputs
    if (!title || !details || !eventDate) {
      alert("Please fill in all required fields.");
      return;
    }

    // Create FormData object to hold form data, including the photo
    const formData = new FormData();
    formData.append("title", title);
    formData.append("details", details);
    formData.append("eventDate", eventDate);

    // Only append the photo if it exists
    if (eventPhoto) {
      formData.append("event_photo", eventPhoto);
    }

    // Send data to PHP file using fetch
    fetch("includes/create_event.php", {
      method: "POST",
      body: formData, // Use FormData to handle file upload
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Event created successfully!");
          // Optionally, reset the form fields
          document.getElementById("event_title").value = "";
          document.getElementById("details").value = "";
          document.getElementById("eventDate").value = "";
          document.getElementById("event_image_input").value = ""; // Reset the file input
        } else {
          alert("Error creating event: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while creating the event.");
      });
  });
