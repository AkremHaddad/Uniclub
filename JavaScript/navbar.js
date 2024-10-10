function ShowSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}

function HideSidebar() {
  var sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    sidebar.style.display = "none";
  }
}

var searchbars = document.getElementsByClassName("searchbar");

for (var i = 0; i < searchbars.length; i++) {
  searchbars[i].addEventListener("focus", function () {
    this.value = "";
  });

  searchbars[i].addEventListener("blur", function () {
    this.value = "Search...";
  });
}

function hideSidebarOnResize() {
  var sidebar = document.querySelector(".sidebar");

  if (window.innerWidth > 800) {
    sidebar.style.display = "none";
  }
}
window.addEventListener("resize", hideSidebarOnResize);
document.addEventListener("DOMContentLoaded", hideSidebarOnResize);

// Get the profile picture and menu elements
// Get all elements with the class "profileImage"
var profileImage = document.getElementById("profileImage1");

// Loop through the collection and add event listener to each element
if (profileImage) {
  profileImage.addEventListener("click", function () {
    var dropdown = document.getElementById("dropdownMenu");
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
      dropdown.style.display = "block";
    }
  });
}

// // Close dropdown if clicked outside
if (profileImage) {
  window.addEventListener("click", function (e) {
    var profileImage = document.getElementById("profileImage1");
    var dropdown = document.getElementById("dropdownMenu");
    if (!profileImage.contains(e.target)) {
      dropdown.style.display = "none";
    }
  });
}

async function getUnreadNotifications() {
  try {
    const response = await fetch("includes/getNotif.php"); // Adjust the URL if necessary
    const notifications = await response.json(); // Assuming the response is JSON

    if (Array.isArray(notifications) && notifications.length > 0) {
      // Call a function to display the notifications
      displayNotifications(notifications);
    } else {
      console.log("No unread notifications.");
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
}

// Function to display notifications (you can customize how to show them)
function displayNotifications(notifications) {
  const notifContainer = document.getElementById("notifContainer"); // A container in your HTML

  // Clear the container before appending new notifications
  notifContainer.innerHTML = "";

  notifications.forEach((notifText) => {
    const notifElement = document.createElement("div");
    notifElement.classList.add("notification");
    notifElement.innerHTML = notifText; // Display the notification text

    notifContainer.appendChild(notifElement);
  });
}

var notification_container = document.getElementById("notification_container");

if (notification_container) {
  notification_container.addEventListener("click", function () {
    var dropdown = document.getElementById("notificationDropdownMenu");
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
      dropdown.style.display = "block";
    }
  });
}

// // Close dropdown if clicked outside
if (notification_container) {
  window.addEventListener("click", function (e) {
    var dropdown = document.getElementById("notificationDropdownMenu");
    if (!notification_container.contains(e.target)) {
      dropdown.style.display = "none";
    }
  });
}
