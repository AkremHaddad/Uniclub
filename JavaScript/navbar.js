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
var profileImages = document.querySelectorAll(".profileImage");
console.log(profileImages[0]);

// Loop through the collection and add event listener to each element
for (var i = 0; i < profileImages.length; i++) {
  profileImages[i].addEventListener("click", function () {
    var dropdown = document.getElementById("dropdownMenu");
    console.log(dropdown);
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
      dropdown.style.display = "block";
    } else {
      dropdown.style.display = "none";
    }
  });
}

// Close dropdown if clicked outside
window.addEventListener("click", function (e) {
  var profileImage = document.getElementById("profileImage");
  var dropdown = document.getElementById("dropdownMenu");
  if (!profileImage.contains(e.target)) {
    dropdown.style.display = "none";
  }
});
