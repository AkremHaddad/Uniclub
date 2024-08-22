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
