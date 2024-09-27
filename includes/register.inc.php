<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $studyField = $_POST['studyField'] ?? '';
    $facebook = $_POST['facebook'] ?? '';
    $instagram = $_POST['instagram'] ?? '';
    $linkedin = $_POST['linkedin'] ?? '';
    $bio = $_POST['bio'] ?? '';

    $cvUploadPath = ''; // Initialize variable to store CV path
    if ($_FILES['cv']['error'] === UPLOAD_ERR_OK) {
        $cvTmpName = $_FILES['cv']['tmp_name'];
        $cvUploadPath = 'uploads/' . basename($_FILES['cv']['name']);
        move_uploaded_file($cvTmpName, $cvUploadPath);
    }

    $photoUploadPath = ''; 
    if ($_FILES['profile_pic']['error'] === UPLOAD_ERR_OK) {
        $photoTmpName = $_FILES['profile_pic']['tmp_name'];
        $photoUploadPath = 'uploads/' . basename($_FILES['profile_pic']['name']);
        move_uploaded_file($photoTmpName, $photoUploadPath);
    }

    // Handle interests (if checkboxes are used)
    // Handle interests
  $interests = $_POST['interests'] ?? [];
  $interestsStr = implode(", ", $interests); // Convert array to comma-separated string


    try {
    // Now you can insert these values into your database or perform further processing
    // Example: Insert into database
    // Replace with your database connection code
      require_once 'dbh.inc.php'; // Include your database connection script

      // Example SQL query (replace with actual query using prepared statements)
      

      // Execute the query
      if ($stmt->execute()) {
          // Redirect to a success page or do further processing
          header("Location: register_success.php");
          exit();
      } else {
          // Handle the error (e.g., redirect back to the form with an error message)
          header("Location: register.php?error=db_error");
          exit();
      }
    }
    catch (PDOException $e) {
      die("Query failed" . $e->getMessage());
    }
} else {
    header("Location: register.php");
    exit();
}
?>
