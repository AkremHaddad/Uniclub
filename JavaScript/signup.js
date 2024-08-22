function previewImage(event) {
  var input = event.target;
  var file = input.files[0];
  var preview = document.getElementById("profileImage");

  if (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
}
