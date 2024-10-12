// Function to fetch events from the server
async function fetchEvents() {
  try {
    const response = await fetch("includes/getClubEvents.php");
    const events = await response.json();
    const eventsTabContainer = document.querySelector(".events_tab_container");

    // Fetch admin status
    const adminResponse = await fetch("includes/getIsUserAdmin.php");
    const adminData = await adminResponse.json();
    const isUserAdmin = adminData.is_user_admin;

    // Show the "Create event" button if the user is an admin
    if (isUserAdmin) {
      createEventButton(eventsTabContainer);
    }

    // Generate HTML for each event and append it to the container
    events.forEach((event) => {
      const eventHTML = generateEventHTML(event, isUserAdmin);
      eventsTabContainer.innerHTML += eventHTML;
    });

    // Add event listeners for delete buttons
    addDeleteEventListeners();

    // Setup file upload functionality
    setupFileUpload();

    // Show create event form when the button is clicked
    document
      .getElementById("create_event")
      ?.addEventListener("click", function () {
        document.getElementById("ctab3_create").style.display = "block";
      });
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

// Function to create and append the "Create Event" button
function createEventButton(container) {
  const button = document.createElement("button");
  button.id = "create_event";
  button.innerText = "Create Event";
  container.appendChild(button);
}

// Function to generate HTML for an event
function generateEventHTML(event, isUserAdmin) {
  return `
    <div class="event_container" data-event-id="${event.id}">
      <div class="club_name_photo_container">
        <div>
          <a href="./club.php?club_id=${event.club_id}">
            ${
              event.clubProfilePhoto
                ? `<img data-post-id="${event.club_id}" class="club_photo" src="data:image/jpeg;base64,${event.clubProfilePhoto}" alt="Profile Photo" />`
                : ""
            }
          </a>
        </div>
        <span>${event.clubName}</span>         
        ${
          isUserAdmin
            ? `<button class="delete_event" data-event-id="${event.id}">Delete</button>`
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
     <div style="display: flex">
     <div class="eventDiscription">${event.attendeeCount} people attending</div>
       <p class="event_date">date: ${event.date1}</p>
     </div>
     </div>`;
}

// Function to add event listeners to delete buttons
function addDeleteEventListeners() {
  document.querySelectorAll(".delete_event").forEach((button) => {
    button.addEventListener("click", async function () {
      const eventId = this.getAttribute("data-event-id");
      await deleteEvent(eventId);
    });
  });
}

// Function to delete an event
async function deleteEvent(eventId) {
  try {
    const response = await fetch("includes/deleteEvent.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventId: eventId }),
    });
    const data = await response.json();

    if (data.success) {
      document.querySelector(`div[data-event-id="${eventId}"]`).remove();
      alert("Event deleted successfully!");
    } else {
      alert("Failed to delete event: " + data.error);
    }
  } catch (error) {
    console.error("Error deleting event:", error);
  }
}

// Function to setup the file upload functionality
function setupFileUpload() {
  document
    .getElementById("post_photo2")
    ?.addEventListener("click", function () {
      document.getElementById("event_image_input").click();
    });

  document
    .getElementById("event_image_input")
    ?.addEventListener("change", function () {
      const files = this.files;
      const insertedPhotos = document.getElementById("inserted_photo2");

      // Clear the container if there's already an image
      insertedPhotos.innerHTML = ""; // Remove the previous image

      // Only process the first file since we allow a maximum of 1 photo
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          // Create a new image element
          const img = document.createElement("img");
          img.src = e.target.result;

          // Append the image to the container
          insertedPhotos.appendChild(img);
        };
        reader.readAsDataURL(file);
      }
    });
}

// Fetch events when the script loads
fetchEvents();
