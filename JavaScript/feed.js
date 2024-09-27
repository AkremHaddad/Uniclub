// Fetch posts from the server (assuming you're calling a PHP file like 'getPosts.php')
fetch("includes/getPosts.php")
  .then((response) => response.json())
  .then((posts) => {
    const feedContainer = document.querySelector(".feed-container");

    // Loop through the posts and generate HTML for each post
    posts.forEach((post) => {
      const postPhotos = [];

      // Only add photos if they exist
      if (post.photo1) postPhotos.push(post.photo1);
      if (post.photo2) postPhotos.push(post.photo2);
      if (post.photo3) postPhotos.push(post.photo3);
      if (post.photo4) postPhotos.push(post.photo4);

      // Now you can safely access postPhotos.length
      const numberOfPhotos = postPhotos.length;

      // const postPhotosDiv = document.querySelector(".post-photos");
      // postPhotosDiv.classList.add(`photos-${numberOfPhotos}`);
      const postHTML = `
        <div class="post">
          <div class"club_name_photo_container">
            <div>${
              post.clubProfilePhoto
                ? `<img src="data:image/jpeg;base64,${post.clubProfilePhoto}" alt="Photo 1" />`
                : ""
            }</div>
            <span>${post.clubName}</span>
          </div>
          <div class="post_text">${post.text}</div>
          <div class="post-photos photos-${numberOfPhotos}">
            ${
              post.photo1
                ? `<img src="data:image/jpeg;base64,${post.photo1}" alt="Photo 1" />`
                : ""
            }
            ${
              post.photo2
                ? `<img src="data:image/jpeg;base64,${post.photo2}" alt="Photo 2" />`
                : ""
            }
            ${
              post.photo3
                ? `<img src="data:image/jpeg;base64,${post.photo3}" alt="Photo 3" />`
                : ""
            }
            ${
              post.photo4
                ? `<img src="data:image/jpeg;base64,${post.photo4}" alt="Photo 4" />`
                : ""
            }
          </div>
          <div class="user_reaction">
            <div class="love">
              <div>
                <ion-icon name="heart-outline"></ion-icon>
              </div>
              <span>
                ${post.loveReacts}
              </span>
            </div>
            <div class="upvote">
              <div>
                <ion-icon name="arrow-up-circle-outline"></ion-icon>
              </div>
              <span>
                ${post.upvotes}
              </span>
            </div>
            <div class="downvote">
              <div>
                <ion-icon name="arrow-down-circle-outline"></ion-icon>
              </div>
              <span>
                ${post.downvotes}
              </span>
            </div>
            <div class="repost">
              <div>
                <ion-icon name="arrow-undo-outline"></ion-icon></ion-icon>
              </div>
              <span>
                ${post.reposts}
              </span>
            </div>
            <div class="bookmark">
              <div>
                <ion-icon name="bookmark-outline"></ion-icon>
              </div>
              <span>
                ${post.bookmarks}
              </span>
            </div>
        </div>          
        </div>  
      `;

      // Append the post HTML to the feed container
      feedContainer.innerHTML += postHTML;
      // Select each ion-icon by its name and toggle the outline/filled state
      // Function to toggle between outline and filled icons
      const userReactionDiv = document.querySelector(".user_reaction");
      const iconDivs = userReactionDiv.querySelectorAll(
        ".love, .upvote, .downvote, .repost, .bookmark"
      );

      iconDivs.forEach((iconDiv) => {
        iconDiv.addEventListener("click", () => {
          const icon = iconDiv.querySelector("ion-icon");
          const iconName = icon.getAttribute("name");
          const outlinedIcon = iconName.endsWith("-outline");

          if (outlinedIcon) {
            icon.setAttribute("name", iconName.replace("-outline", ""));
          } else {
            icon.setAttribute("name", iconName + "-outline");
          }
        });
      });
    });
  })
  .catch((error) => console.error("Error fetching posts:", error));
