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
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

  let liTag = "";

  // Create li for previous month days
  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive" data-day="${
      lastDateofLastMonth - i + 1
    }" data-month="${currMonth - 1}" data-year="${currYear}">${
      lastDateofLastMonth - i + 1
    }</li>`;
  }

  // Create li for current month days
  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}" data-day="${i}" data-month="${currMonth}" data-year="${currYear}">${i}</li>`;
  }

  // Create li for next month days
  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive" data-day="${
      i - lastDayofMonth + 1
    }" data-month="${currMonth + 1}" data-year="${currYear}">${
      i - lastDayofMonth + 1
    }</li>`;
  }

  currentMonth.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;

  addEventListenersToDays(); // Call function to add click events
};

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

const addEventListenersToDays = () => {
  document.querySelectorAll(".days li").forEach((day) => {
    day.addEventListener("click", (e) => {
      // Remove "active" class from previously selected day
      document
        .querySelectorAll(".days li")
        .forEach((li) => li.classList.remove("active"));
      e.target.classList.add("active");

      const dayNumber = e.target.dataset.day;
      const month = e.target.dataset.month;
      const year = e.target.dataset.year;

      if (dayNumber && month && year) {
        const selectedDate = new Date(year, month, Number(dayNumber) + 1);
        const dayName = selectedDate.toLocaleString("default", {
          weekday: "long",
        });
        // currentDay.innerHTML = `<p>${dayName}</p>, <span>${dayNumber}</span>`;

        // Convert date to YYYY-MM-DD format for the query
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
                          ? `<img class="eventPhoto" src="data:image/jpeg;base64,${event.photos}" alt="Event Photo" style="width: 100%;">`
                          : "No photo"
                      }
                      <button class="view-more" data-photo="${
                        event.photos
                      }">View More</button>
                    </div>
                  </div>
                  <div class="user_reaction">
                      <div class="love">
                        <div>
                          <ion-icon name="heart-outline"></ion-icon>
                        </div>
                        <span>
                          ${event.loveReacts}
                        </span>
                      </div>
                      <div class="upvote">
                        <div>
                          <ion-icon name="arrow-up-circle-outline"></ion-icon>
                        </div>
                        <span>
                          ${event.upvotes}
                        </span>
                      </div>
                      <div class="downvote">
                        <div>
                          <ion-icon name="arrow-down-circle-outline"></ion-icon>
                        </div>
                        <span>
                          ${event.downvotes}
                        </span>
                      </div>
                      <div class="bookmark">
                        <div>
                          <ion-icon name="bookmark-outline"></ion-icon>
                        </div>
                        <span>
                          ${event.bookmarks}
                        </span>
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
      } else {
        // currentDay.innerText = "";
      }
    });
  });
};

renderCalendar();
