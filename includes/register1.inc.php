<?php

header('Content-Type: text/html'); // Set the content type as HTML

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    require_once 'config_session.inc.php';

    // Check if user is logged in    
    if (isset($_SESSION['user_id'])) { 
        $userId = $_SESSION['user_id']; // Assuming user ID is stored in the session
    } else {
        // Redirect if user is not logged in
        header("Location: login.php?error=not_logged_in");
        exit();
    }

    // Collect form inputs with default values
    $studyField = $_POST['studyField'] ?? '';
    $facebook = $_POST['facebook'] ?? '';
    $instagram = $_POST['instagram'] ?? '';
    $linkedin = $_POST['linkedin'] ?? '';
    $bio = $_POST['bio'] ?? '';

    // Initialize variables for file upload paths
    $cvUploadPath = ''; 
    if (isset($_FILES['cv']) && $_FILES['cv']['error'] === UPLOAD_ERR_OK) {
        $cvTmpName = $_FILES['cv']['tmp_name'];
        $cvUploadPath = 'uploads/' . basename($_FILES['cv']['name']);
        move_uploaded_file($cvTmpName, $cvUploadPath);
    }

        require_once 'dbh.inc.php'; 


    // Prepare to store the file content as BLOB
    if (isset($_FILES['profile_pic']) && $_FILES['profile_pic']['error'] === UPLOAD_ERR_OK) {
        $photoTmpName = $_FILES['profile_pic']['tmp_name'];
        $photoContent = file_get_contents($photoTmpName); // Read file content
        $photoName = $_FILES['profile_pic']['name'];
        $photoExt = strtolower(pathinfo($photoName, PATHINFO_EXTENSION));
        $allowedExt = ['jpg', 'jpeg', 'png', 'gif', 'jfif'];

        if (in_array($photoExt, $allowedExt)) {
            // Store the file content as BLOB in the database
            $stmt = $pdo->prepare("UPDATE users SET profile_image = ? WHERE id = ?");
            $stmt->execute([$photoContent, $userId]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Invalid file type: ' . $photoName]);
            exit();
        }
    }

    $interests = $_POST['selected_interests'] ?? []; // Collect as an array
    $interestsStr = implode(", ", $interests); // Convert array to comma-separated string

    // Handle interests (if checkboxes are used)


    try {
        // Include your database connection script
        
        // Prepare your SQL query using prepared statements to prevent SQL injection
        $stmt = $pdo->prepare("UPDATE users SET studyField = ?, facebook = ?, instagram = ?, linkedin = ?, bio = ?, cv = ?, profile_image = ?, interests = ? WHERE id = ?");

        // Execute the query with the collected data
        $stmt->execute([$studyField, $facebook, $instagram, $linkedin, $bio, $cvUploadPath, $photoContent, $interestsStr, $userId]);

        // Redirect to a success page
        header("Location: ../index.php");
        exit();
        
    } catch (PDOException $e) {
        // Redirect to error page with error message
        header("Location: register1.inc.php?error=db_error");
        exit();
    }
} else {
    // Redirect if the form wasn't submitted via POST
    header("Location: register1.inc.php?error=invalid_request");
    exit();
}
