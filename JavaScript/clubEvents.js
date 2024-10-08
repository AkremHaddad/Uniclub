// Fetch events from the server (assuming you're calling a PHP file like 'getEvents.php')
fetch("includes/getClubEvents.php")
  .then((response) => response.json())
  .then((events) => {
    const eventsTabContainer = document.querySelector(".events_tab_container");

    // Optionally, if the user is an admin, show the "Create event" button
    if (events[0].is_user_admin) {
      eventsTabContainer.innerHTML += `
        <button id="create_event">Create Event</button>
      `;
    }

    // Loop through the events and generate HTML for each event
    events.forEach((event) => {
      const eventHTML = `
        <div class="event_container" data-event-id="${event.id}">
          <div class="club_name_photo_container">
            <div>
              <a href="../pfa_final/club.php?club_id=${event.club_id}">
                ${
                  event.clubProfilePhoto
                    ? `<img data-post-id="${event.club_id}" class="club_photo" src="data:image/jpeg;base64,${event.clubProfilePhoto}" alt="Profile Photo" />`
                    : ""
                }
              </a>
            </div>
            <span>${event.clubName}</span>         
            ${
              event.is_user_admin
                ? `
              <button class="delete_event" data-event-id="${event.id}">Delete</button>
            `
                : ""
            }
          </div>
          <div class="event_part1">
            <div class="event_name">
              <p>Event: ${event.title}</p>
            </div>
          </div>
          <div>
            <p class="event_description">${event.description1}</p>
          </div>
          <div class="post-photos photos-1">
            ${
              event.photos
                ? `<img class="post-photos photos-1" src="data:image/jpeg;base64,${event.photos}" alt="Event Photo" style="width: 100%;">`
                : ""
            }
          </div>
          <div>
            <p class="event_date">date: ${event.date1}</p>
          </div>
        </div>
      `;

      // Append the event HTML to the events tab container
      eventsTabContainer.innerHTML += eventHTML;
    });

    document.querySelectorAll(".delete_event").forEach((button) => {
      button.addEventListener("click", function () {
        const eventId = this.getAttribute("data-event-id");
        // Handle the event delete functionality
        console.log("Delete event ID:", eventId);
        // Optionally, send a request to the server to delete the event
        fetch("includes/deleteEvent.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ eventId: eventId }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              // Remove the event from the DOM if successful
              document
                .querySelector(`div[data-event-id="${eventId}"]`)
                .remove();
              alert("Event deleted successfully!");
            } else {
              alert("Failed to delete event: " + data.error);
            }
          })
          .catch((error) => {
            console.error("Error deleting event:", error);
          });
      });
    });

    document
      .getElementById("post_photo2")
      .addEventListener("click", function () {
        var fileInput = document.getElementById("event_image_input");
        if (fileInput) {
          fileInput.click();
        }
      });

    document
      .getElementById("event_image_input")
      .addEventListener("change", function () {
        var files = this.files;
        var insertedPhotos = document.getElementById("inserted_photo2");

        // Clear the container if there's already an image
        if (insertedPhotos.children.length > 0) {
          insertedPhotos.innerHTML = ""; // Remove the previous image
        }

        // Only process the first file since we allow a maximum of 1 photo
        var file = files[0];
        if (file) {
          var reader = new FileReader();

          reader.onload = function (e) {
            // Create a new image element
            var img = document.createElement("img");

            // Set the source attribute of the image
            img.src = e.target.result;

            // Append the image to the container
            insertedPhotos.appendChild(img);
          };

          reader.readAsDataURL(file);
        }
      });

    document
      .getElementById("create_event")
      .addEventListener("click", function () {
        document.getElementById("ctab3_create").style.display = "block";
      });
  })
  .catch((error) => console.error("Error fetching events:", error));
