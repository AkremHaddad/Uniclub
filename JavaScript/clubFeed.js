// Fetch posts from the server (assuming you're calling a PHP file like 'getPosts.php')
fetch("includes/getClubPosts.php")
  .then((response) => response.json())
  .then((posts) => {
    const feedContainer = document.querySelector(".club_feed_container");
    feedContainer.innerHTML = ` ${
      posts[0].is_user_admin
        ? `        <form id="createPostForm" method="post" enctype="multipart/form-data">
                      <div id="create_p">
                          <textarea
                              id="post_input"
                              name="post_content"
                              placeholder="Write your post here..."
                              maxlength="400"
                          ></textarea>
                          <div id="post_container2">
                              <div id="inserted_photos"></div>
                              <input
                                  type="file"
                                  id="post_image_input"
                                  name="post_images[]"
                                  style="display: none"
                                  accept="image/*"
                                  multiple="multiple"
                              />
                              <img id="post_photo" class="post_photo" alt="" src="media/gallery-photo.svg" />
                              <button id="post_butt" type="button">Post</button>
                          </div>
                      </div>
                    </form> `
        : ""
    } `;
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
        </div>  
      `;

      // Append the post HTML to the feed container

      feedContainer.innerHTML += postHTML;
    });
    // Select each ion-icon by its name and toggle the outline/filled state
    // Function to toggle between outline and filled icons

    document.querySelectorAll(".user_reaction > div").forEach((element) => {
      element.addEventListener("click", function () {
        const icon = element.querySelector("ion-icon");
        const iconName = icon.getAttribute("name");
        const outlinedIcon = iconName.endsWith("-outline");
        const span = element.querySelector("span"); // Get the span inside the div

        if (outlinedIcon) {
          icon.setAttribute("name", iconName.replace("-outline", ""));
          element.classList.add("reacted");

          // Increment the number in the span
          span.textContent = parseInt(span.textContent) + 1;
        } else {
          icon.setAttribute("name", iconName + "-outline");
          element.classList.remove("reacted");

          // Decrement the number in the span
          span.textContent = parseInt(span.textContent) - 1;
        }
      });
    });

    document.querySelectorAll(".user_reaction > div").forEach((element) => {
      element.addEventListener("click", function () {
        const action = this.classList[0]; // Gets the class name, e.g., "love"
        const postId = this.closest(".user_reaction").dataset.postId; // Get post ID from parent div
        console.log(action, postId);
        fetch("includes/update_reaction.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: action, postId: postId }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              // Optionally update UI with new counts here
              console.log(data.message);
            } else {
              console.error(data.message);
            }
          })
          .catch((error) => console.error("Error:", error));
      });
    });

    document
      .getElementById("post_photo")
      .addEventListener("click", function () {
        var fileInput = document.getElementById("post_image_input");
        if (fileInput) {
          fileInput.click();
        }
      });
    document
      .getElementById("post_image_input")
      .addEventListener("change", function () {
        var files = this.files;
        var insertedPhotos = document.getElementById("inserted_photos");

        // Check if the maximum number of photos has been reached
        if (insertedPhotos.children.length >= 4) {
          alert("You can only add up to 4 photos.");
          return;
        }

        for (var i = 0; i < files.length; i++) {
          var file = files[i];
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

    document.getElementById("post_butt").addEventListener("click", function () {
      console.log("test1");
      const form = document.getElementById("createPostForm");
      const formData = new FormData(form);

      // Send the form data using fetch
      fetch("includes/createPost.inc.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json()) // Assuming the server responds with JSON
        .then((data) => {
          if (data.success) {
            // Handle success (e.g., display success message, clear form, update posts list)
            alert("Post created successfully!");
            form.reset(); // Reset form after successful submission
          } else {
            // Handle error (e.g., display error message)
            alert("Failed to create post: " + data.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  })
  .catch((error) => console.error("Error fetching posts:", error));
