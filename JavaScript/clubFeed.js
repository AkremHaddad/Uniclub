async function fetchData() {
  try {
    const postsResponse = await fetch("includes/getClubPosts.php");
    const posts = await postsResponse.json();

    const adminResponse = await fetch("includes/getIsUserAdmin.php");
    const adminData = await adminResponse.json();
    const isUserAdmin = adminData.is_user_admin;

    const feedContainer = document.querySelector(".club_feed_container");
    if (isUserAdmin) {
      feedContainer.innerHTML += `
        <form id="createPostForm" method="post" enctype="multipart/form-data">
          <div id="create_p">
            <textarea id="post_input" name="post_content" placeholder="Write your post here..." maxlength="400"></textarea>
            <div id="post_container2">
              <div id="inserted_photos"></div>
              <input type="file" id="post_image_input" name="post_images[]" style="display: none" accept="image/*" multiple="multiple" />
              <img id="post_photo" class="post_photo" alt="" src="media/gallery-photo.svg" />
              <button id="post_butt" type="button">Post</button>
            </div>
          </div>
        </form>`;
    }

    posts.forEach((post) => {
      const postPhotos = [
        post.photo1,
        post.photo2,
        post.photo3,
        post.photo4,
      ].filter(Boolean);
      const numberOfPhotos = postPhotos.length;

      const postHTML = `
        <div class="post" data-post-id="${post.id}">
          <div class="club_name_photo_container">
            <div>
              <a href="../pfa_final/club.php?club_id=${post.club_id}">
                ${
                  post.clubProfilePhoto
                    ? `<img data-post-id="${post.club_id}" class="club_photo" src="data:image/jpeg;base64,${post.clubProfilePhoto}" alt="Profile Photo" />`
                    : ""
                }
              </a>
            </div>
            <span>${post.clubName}</span>
            ${
              post.is_user_admin
                ? `<button class="delete_post">delete</button>`
                : ""
            }
          </div>
          <div class="post_text">${post.text}</div>
          <div class="post-photos photos-${numberOfPhotos}">
            ${postPhotos
              .map(
                (photo, index) =>
                  `<img src="data:image/jpeg;base64,${photo}" alt="Photo ${
                    index + 1
                  }" />`
              )
              .join("")}
          </div>
         <div class="user_reaction" data-post-id="${post.id}">
            <div class="love ${post.userLoved ? "reacted" : ""}">
              <div>
                <ion-icon name="${
                  post.userLoved ? "heart" : "heart-outline"
                }"></ion-icon>
              </div>
              <span>${post.loveReacts}</span>
            </div>
            <div class="upvote ${post.userUpvoted ? "reacted" : ""}">
              <div>
                <ion-icon name="${
                  post.userUpvoted
                    ? "arrow-up-circle"
                    : "arrow-up-circle-outline"
                }"></ion-icon>
              </div>
              <span>${post.upvotes}</span>
            </div>
            <div class="downvote ${post.userDownvoted ? "reacted" : ""}">
              <div>
                <ion-icon name="${
                  post.userDownvoted
                    ? "arrow-down-circle"
                    : "arrow-down-circle-outline"
                }"></ion-icon>
              </div>
              <span>${post.downvotes}</span>
            </div>
            <div class="repost ${post.userReposted ? "reacted" : ""}">
              <div>
                <ion-icon name="${
                  post.userReposted ? "arrow-undo" : "arrow-undo-outline"
                }"></ion-icon>
              </div>
              <span>${post.reposts}</span>
            </div>
            <div class="bookmark ${post.userBookmarked ? "reacted" : ""}">
              <div>
                <ion-icon name="${
                  post.userBookmarked ? "bookmark" : "bookmark-outline"
                }"></ion-icon>
              </div>
              <span>${post.bookmarks}</span>
            </div>
          </div>
        </div>  `;
      feedContainer.innerHTML += postHTML;
    });

    setupReactionListeners();
    setupPostCreation();
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

function setupReactionListeners() {
  document.querySelectorAll(".user_reaction > div").forEach((element) => {
    element.addEventListener("click", async function () {
      const action = this.classList[0];
      const postId = this.closest(".user_reaction").dataset.postId;

      // Toggle icon state
      const icon = this.querySelector("ion-icon");
      const iconName = icon.getAttribute("name");
      const outlinedIcon = iconName.endsWith("-outline");
      const span = this.querySelector("span");

      if (outlinedIcon) {
        icon.setAttribute("name", iconName.replace("-outline", ""));
        this.classList.add("reacted");
        span.textContent = parseInt(span.textContent) + 1;
      } else {
        icon.setAttribute("name", iconName + "-outline");
        this.classList.remove("reacted");
        span.textContent = parseInt(span.textContent) - 1;
      }

      // Send update to the server
      try {
        const response = await fetch("includes/update_reaction.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: action, postId: postId }),
        });
        const data = await response.json();
        if (!data.success) {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error updating reaction:", error);
      }
    });
  });
}

function setupPostCreation() {
  document.getElementById("post_photo").addEventListener("click", function () {
    document.getElementById("post_image_input").click();
  });

  document
    .getElementById("post_image_input")
    .addEventListener("change", function () {
      const files = this.files;
      const insertedPhotos = document.getElementById("inserted_photos");

      if (insertedPhotos.children.length >= 4) {
        alert("You can only add up to 4 photos.");
        return;
      }

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = document.createElement("img");
          img.src = e.target.result;
          insertedPhotos.appendChild(img);
        };
        reader.readAsDataURL(file);
      });
    });

  document
    .getElementById("post_butt")
    .addEventListener("click", async function () {
      const form = document.getElementById("createPostForm");
      const formData = new FormData(form);
      try {
        const response = await fetch("includes/createPost.inc.php", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (data.success) {
          alert("Post created successfully!");
          form.reset();
        } else {
          alert("Failed to create post: " + data.error);
        }
      } catch (error) {
        console.error("Error creating post:", error);
      }
    });
}

// Call the fetchData function to execute
fetchData();
