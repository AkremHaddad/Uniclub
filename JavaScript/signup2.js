function nextTab() {
  const part1 = document.getElementById("part1");
  const part2 = document.getElementById("part2");
  part1.classList.remove("currentTab");
  part1.classList.add("hiddenTab");
  part2.classList.remove("hiddenTab");
  part2.classList.add("currentTab2");
}

function previousTab() {
  const part1 = document.getElementById("part1");
  const part2 = document.getElementById("part2");
  part1.classList.remove("hiddenTab");
  part1.classList.add("currentTab");
  part2.classList.remove("currentTab2");
  part2.classList.add("hiddenTab");
}

// function previewImage(event) {
//   var input = event.target;
//   var file = input.files[0];
//   var preview = document.getElementById("profileImage");

//   if (file) {
//     var reader = new FileReader();

//     reader.onload = function (e) {
//       preview.src = e.target.result;
//     };

//     reader.readAsDataURL(file);
//   }
// }

function loadFile(event) {
  var image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
}

var interests = document.getElementsByClassName("interest");
var selectedInterests = [];

// Toggle class on click and store selected interests
for (var i = 0; i < interests.length; i++) {
  interests[i].addEventListener("click", function () {
    this.classList.toggle("interested");

    // Get the interest value from data attribute
    var interestValue = this.getAttribute("data-interest");

    // Check if the interest is already selected
    var index = selectedInterests.indexOf(interestValue);
    if (index > -1) {
      // If it is selected, remove it from the array
      selectedInterests.splice(index, 1);
    } else {
      // If not, add it to the array
      selectedInterests.push(interestValue);
    }
  });
}

// Handle form submission
document.querySelector("form").addEventListener("submit", function (e) {
  // Create a hidden input to hold the interests
  var interestsInput = document.createElement("input");
  interestsInput.type = "hidden";
  interestsInput.name = "interests[]"; // Use array syntax for PHP
  interestsInput.value = selectedInterests.join(","); // Join selected interests

  // Append to the form
  this.appendChild(interestsInput);
});
