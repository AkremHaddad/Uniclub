// Fetch posts from the server (assuming you're calling a PHP file like 'getClubPhotos.php')
fetch("includes/getClubPhotos.php")
  .then((response) => response.json())
  .then((ProfileCover) => {
    const club_photos_container = document.querySelector(
      ".club_photos_container"
    );

    if (ProfileCover) {
      const profileHTML = `
          <div class="cover_photo_container">
            ${
              ProfileCover.cover_photo
                ? `<img class="cover_photo" src="data:image/jpeg;base64,${ProfileCover.cover_photo}" alt="Cover Photo">`
                : ""
            }
          </div>
          
          <div class="profile_info_container">
            <div class="profile_photo_container">
              ${
                ProfileCover.profile_photo
                  ? `<img class="profile_photo" src="data:image/jpeg;base64,${ProfileCover.profile_photo}" alt="Profile Photo">`
                  : ""
              }
            </div>
            <div class="club_info">
              <h2 class="club_name">${ProfileCover.club_name}</h2>
              <p class="club_members">${ProfileCover.member_count} Members</p>
            </div>
          </div>
        `;

      club_photos_container.innerHTML += profileHTML;
    } else {
      club_photos_container.innerHTML = "<p>No club information found.</p>";
    }
  })
  .catch((error) => console.error("Error fetching club data:", error));
