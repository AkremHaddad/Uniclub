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

document.addEventListener("DOMContentLoaded", function () {
  const interests = document.querySelectorAll(".interest");
  const selectedInterestsInput = document.getElementById("selected-interests");
  let selectedInterests = [];

  interests.forEach((interest) => {
    interest.addEventListener("click", function () {
      // Get the interest value from the data attribute
      const interestValue = interest.getAttribute("data-interest");

      // Toggle the "interested" class
      this.classList.toggle("interested");

      // Check if the interest is already selected
      const index = selectedInterests.indexOf(interestValue);
      if (index > -1) {
        // If it is selected, remove it from the array
        selectedInterests.splice(index, 1);
      } else {
        // If not, add it to the array
        selectedInterests.push(interestValue);
      }

      // Update the hidden input value with selected interests as a comma-separated string
      selectedInterestsInput.value = selectedInterests.join(",");
    });
  });
});
