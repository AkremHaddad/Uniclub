const daysTag = document.querySelector(".days");
const currentMonth = document.querySelector(".currentMonth");
const prevNextIcon = document.querySelectorAll(".icons span");
const currentDay = document.querySelector(".current_day");

// Getting new date, current year, and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

// Storing full name of all months in array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // Getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // Getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // Getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // Getting last date of previous month
  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    // Creating li of previous month last days
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    // Creating li of all days of current month
    // Adding active class to li if the current day, month, and year matched
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}" data-day="${i}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    // Creating li of next month first days
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentMonth.innerText = `${months[currMonth]} ${currYear}`; // Passing current month and year as currentDate text
  daysTag.innerHTML = liTag;

  // Add event listeners to the newly created day elements
  // Select all <li> elements within the .days class
  document.querySelectorAll(".days li").forEach((day) => {
    day.addEventListener("click", (e) => {
      // Remove "active" class from previously selected day
      document
        .querySelectorAll(".days li")
        .forEach((li) => li.classList.remove("active"));

      // Add "active" class to the clicked day
      e.target.classList.add("active");

      // Get the day number from the clicked element's data attribute
      const dayNumber = e.target.dataset.day;

      if (dayNumber) {
        // Create a new Date object with the selected day
        const selectedDate = new Date(currYear, currMonth, dayNumber);

        // Get the full name of the weekday
        const dayName = selectedDate.toLocaleString("default", {
          weekday: "long",
        });

        // Update the currentDay element with the selected date information
        currentDay.innerHTML = `<p>${dayName}</p>, <span>${dayNumber}</span>`;
      } else {
        // Clear the currentDay text if an inactive day is clicked
        currentDay.innerText = "";
      }
    });
  });
};

renderCalendar();

prevNextIcon.forEach((icon) => {
  // Getting prev and next icons
  icon.addEventListener("click", () => {
    // Adding click event on both icons
    // If clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      // If current month is less than 0 or greater than 11
      // Creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // Updating current year with new date year
      currMonth = date.getMonth(); // Updating current month with new date month
    } else {
      date = new Date(); // Pass the current date as date value
    }
    renderCalendar(); // Calling renderCalendar function
  });
});

document.querySelectorAll(".days li").forEach((day) => {
  day.addEventListener("click", (e) => {
    const dayNumber = Number(e.target.innerText) + 1; // Get the clicked day number
    const selectedDate = new Date(currYear, currMonth, dayNumber); // Create a date object

    // Convert the date to YYYY-MM-DD format for the query
    const formattedDate = selectedDate.toISOString().split("T")[0];

    // Fetch events for the selected date using an AJAX request to the PHP function
    fetch(`includes/getEvents.php?date=${formattedDate}`)
      .then((response) => response.json())
      .then((events) => {
        const eventsContainer = document.querySelector(".currentDayEvents");
        eventsContainer.innerHTML = ""; // Clear previous events

        events.forEach((event) => {
          // Create event HTML structure
          const eventHTML = `
            <div class="event">
              <div class="eventTitle">${event.title}</div>
              <div class="eventDiscription">${event.description1}</div>
              <div class="eventPhotos">
                <div class="photo-container">
                  ${
                    event.photos
                      ? `<img src="data:image/jpeg;base64,${event.photos}" alt="Event Photo" style="width: 100%; height: auto;">`
                      : "No photo"
                  }
                  <button class="view-more" data-photo="${
                    event.photos
                  }">View More</button>
                </div>
              </div>
            </div>
          `;
          eventsContainer.innerHTML += eventHTML;
        });

        // Attach event listeners to dynamically created buttons
        document.querySelectorAll(".view-more").forEach((button) => {
          button.addEventListener("click", (e) => {
            const photoData = e.target.getAttribute("data-photo");
            if (photoData) {
              // Create a Blob from the Base64 data
              const blob = new Blob(
                [Uint8Array.from(atob(photoData), (c) => c.charCodeAt(0))],
                { type: "image/jpeg" }
              );
              const url = URL.createObjectURL(blob);
              window.open(url, "_blank");
            }
          });
        });
      })
      .catch((error) => console.error("Error:", error));
  });
});
