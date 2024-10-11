<?php

require_once 'dbh.inc.php'; // Database connection
require_once 'config_session.inc.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$userId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

// Check if the form was submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the club details from the form
    $clubName = $_POST['clubName'];
    $bio = $_POST['bio'];

    // Handle file uploads
    $profilePhoto = $_FILES['profilePhoto'];
    $coverPhoto = $_FILES['coverPhoto'];

    // Define allowed file types and maximum file size (16MB for MEDIUMBLOB)
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    $maxMediumBlobSize = 16 * 1024 * 1024; // 16MB

    // Function to validate and read the uploaded file
    function validateAndReadFile($file, $maxFileSize)
    {
        global $allowedTypes;

        // Check for file upload errors
        if ($file['error'] !== UPLOAD_ERR_OK) {
            return ['success' => false, 'message' => 'File upload error.'];
        }

        // Check file size
        if ($file['size'] > $maxFileSize) {
            return ['success' => false, 'message' => 'File exceeds maximum allowed size of 16MB.'];
        }

        // Check file type
        if (!in_array($file['type'], $allowedTypes)) {
            return ['success' => false, 'message' => 'Invalid file type.'];
        }

        // Read the file content
        $fileContent = file_get_contents($file['tmp_name']);
        return ['success' => true, 'content' => $fileContent];
    }

    // Validate and read both photos
    $profilePhotoData = validateAndReadFile($profilePhoto, $maxMediumBlobSize);
    $coverPhotoData = validateAndReadFile($coverPhoto, $maxMediumBlobSize);

    // Check if both uploads were successful
    if ($profilePhotoData['success'] && $coverPhotoData['success']) {
        // Prepare and execute the SQL query to insert the club into the database
        $stmt = $pdo->prepare("INSERT INTO club (name, ownerId, bio, profile_photo, cover_photo) VALUES (?, ?, ?, ?, ?)");

        // Execute the statement with binary data
        if ($stmt->execute([$clubName, $userId, $bio, $profilePhotoData['content'], $coverPhotoData['content']])) {
            // Success message
            echo json_encode(['success' => true, 'message' => 'Club created successfully.']);
        } else {
            // Error inserting into the database
            echo json_encode(['success' => false, 'message' => 'Error creating club in database.']);
        }
    } else {
        // Handle file upload error
        echo json_encode(['success' => false, 'message' => $profilePhotoData['message'] ?: $coverPhotoData['message']]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}

// Success and redirect message (Optional)
echo "<script>alert('Club request sent, admin will approve soon.');</script>";
echo "<script>window.location.href = '../index.php';</script>";

exit; // Ensure the script terminates after the redirect
