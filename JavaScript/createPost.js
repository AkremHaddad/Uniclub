document.getElementById("post_butt").addEventListener("click", function () {
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
