function ShowSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}

function HideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
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
