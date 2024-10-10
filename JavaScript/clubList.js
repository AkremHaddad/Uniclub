// Function to fetch clubs where the user is an admin or owner
async function fetchMyClubs() {
  try {
    // Fetch the clubs from the backend (adjust the URL to your backend endpoint)
    const response = await fetch("includes/getMyClubs.php");
    const clubs = await response.json(); // Assuming the response is JSON

    // If clubs exist, display them in the HTML
    if (Array.isArray(clubs) && clubs.length > 0) {
      displayClubs(clubs);
    } else {
      document.getElementById("clubsList").innerHTML = "<p>No clubs found.</p>";
    }
  } catch (error) {
    console.error("Error fetching clubs:", error);
    document.getElementById("clubsList").innerHTML =
      "<p>Error loading clubs.</p>";
  }
}

// Function to display the clubs
function displayClubs(clubs) {
  const clubsList = document.getElementById("clubsList");
  clubsList.innerHTML = ""; // Clear the list first

  // Loop through the clubs and create an HTML element for each
  clubs.forEach((club) => {
    const clubItem = document.createElement("div");
    clubItem.classList.add("club-item");

    // Structure for each club
    clubItem.innerHTML = `
        <a class="myclub_container" href="club.php?club_id=${club.id}">
          <div >
            <h2>${club.name}</h2>
          </div>
        </a>
      `;

    // Append the club item to the clubs list
    clubsList.appendChild(clubItem);
  });
}

// Call the fetchMyClubs function when the page loads
document.addEventListener("DOMContentLoaded", fetchMyClubs);
