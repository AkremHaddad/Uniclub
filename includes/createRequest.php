<?php

require_once 'dbh.inc.php'; // Include your database connection
require_once 'config_session.inc.php'; // Include session configuration

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json'); // Set header for JSON response

function handleFileUpload($file)
{
    // Read the binary content of the uploaded file
    $photoContent = file_get_contents($file['tmp_name']);
    $photoName = $file['name'];
    $photoExt = strtolower(pathinfo($photoName, PATHINFO_EXTENSION));

    // Allowed file extensions
    $allowedExt = ['jpg', 'jpeg', 'png', 'gif', 'pdf'];

    if (!in_array($photoExt, $allowedExt)) {
        echo json_encode(['success' => false, 'error' => 'Invalid file type: ' . $photoName]);
        return null;
    }

    return ['content' => $photoContent, 'name' => $photoName, 'extension' => $photoExt]; // Return file data
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;
    $clubId = isset($_SESSION['club_id']) ? $_SESSION['club_id'] : null;

    // Validate input
    if (!$userId || !$clubId) {
        echo json_encode(['success' => false, 'error' => 'Invalid user or club.']);
        die();
    }

    $requestText = isset($_POST['request_text']) ? trim($_POST['request_text']) : '';
    $photoData = null; // Initialize as null for no file
    $mimeType = null;
    $fileName = null;

    // Handle file upload if a file was provided
    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $fileData = handleFileUpload($_FILES['file']);
        if ($fileData === null) {
            die(); // Exit if there was an error during file upload
        }

        // Get file content, mime type, and file name for storage
        $photoData = $fileData['content'];
        $mimeType = mime_content_type($_FILES['file']['tmp_name']);
        $fileName = $fileData['name'];
    }

    // Prepare and execute the insert statement
    try {
        $query = "INSERT INTO club_requests (clubId, userId, request_text, file, mime_type, file_name) 
                  VALUES (:clubId, :userId, :requestText, :file, :mimeType, :fileName)";

        $stmt = $pdo->prepare($query);
        $stmt->execute([
            ':clubId' => $clubId,
            ':userId' => $userId,
            ':requestText' => $requestText,
            ':file' => $photoData, // Save binary data directly in the database
            ':mimeType' => $mimeType,
            ':fileName' => $fileName
        ]);

        echo json_encode(['success' => true, 'message' => 'Request submitted successfully.']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
}
