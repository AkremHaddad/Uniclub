document.addEventListener("DOMContentLoaded", () => {
  // Listen for click events on the entire document
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete_post")) {
      const postElement = event.target.closest(".post"); // Find the closest post container
      const postId = parseInt(postElement.getAttribute("data-post-id"));
      // Confirm before deletion
      if (confirm("Are you sure you want to delete this post?")) {
        // Send AJAX request to delete the post
        fetch("includes/deletePost.inc.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ post_id: postId }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              // Remove the post from the DOM
              postElement.remove();
              alert(data.message); // Optionally, show a success message
            } else {
              alert(data.message); // Show error message
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred while trying to delete the post.");
          });
      }
    }
  });
});
