// Fetch about us data from the server
fetch("includes/getAboutus.php?club_id=YOUR_CLUB_ID") // Replace YOUR_CLUB_ID with the actual ID
  .then((response) => response.json())
  .then((aboutus) => {
    const about_us_content = document.querySelector("#about_us_content");

    const aboutusHTML = `
      <div class="bio_section">
      ${aboutus.is_user_admin ? ` <button id="edit_bio">edit</button> ` : ""}   
        <h2>About Us</h2>
        <textarea id="bio_textarea" class="bio">${aboutus.bio}</textarea>
      </div>

      <!-- Members List Area -->
      <div class="members_section">
        <h2>Members</h2>
        <ul class="members_list">
          ${aboutus.members.map((name) => `<li>${name}</li>`).join("")}
        </ul>
      </div>
    `;

    about_us_content.innerHTML = aboutusHTML; // Insert the HTML into the content area

    document.getElementById("edit_bio").addEventListener("click", function () {
      document
        .getElementById("edit_bio")
        .addEventListener("click", function () {
          const bioText = document.getElementById("bio_textarea").value; // Get the new bio text

          // Confirm the user wants to update the bio
          if (!bioText) {
            alert("Bio cannot be empty!");
            return;
          }

          fetch("includes/updateBio.inc.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              newBio: bioText,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                alert("Bio updated successfully!");
              } else {
                alert("Error updating bio: " + data.message);
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });
    });
  })
  .catch((error) => console.error("Error fetching about us data:", error));
