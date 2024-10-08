<?php

declare(strict_types=1);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'dbh.inc.php'; // Database connection
require_once 'config_session.inc.php'; // Session configuration


function canUserPost(object $pdo, int $clubId, int $userId): bool
{
    // Check if the user is the club owner or an admin
    $query = "
      SELECT 
          c.ownerId,
          (SELECT COUNT(*) FROM clubmembers WHERE clubId = :clubId AND userId = :userId AND admin = 1) AS isAdmin
      FROM 
          club c 
      WHERE 
          c.id = :clubId;
  ";

    $stmt = $pdo->prepare($query);
    $stmt->execute(['clubId' => $clubId, 'userId' => $userId]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        // Check if the user is the owner or an admin
        return $result['ownerId'] === $userId || $result['isAdmin'] > 0;
    }

    return false; // If no result, deny posting
}

// Assume you have the clubId and userId from the session
$club_id = $_SESSION['club_id'];
$userId = $_SESSION['user_id']; // Assuming the user ID is stored in session

if (!canUserPost($pdo, $club_id, $userId)) {
    echo json_encode(['success' => false, 'error' => 'You do not have permission to post.']);
    die();
}


function createPost(PDO $pdo, int $club_id, string $post_content, array $uploaded_photos): bool
{
    // Insert the post into the database
    $sql = "INSERT INTO posts (clubId, text, photo1, photo2, photo3, photo4) 
            VALUES (?, ?, ?, ?, ?, ?)";

    $stmt = $pdo->prepare($sql);

    // Prepare photo variables as null if not uploaded
    $photo1 = isset($uploaded_photos[0]) ? file_get_contents($uploaded_photos[0]) : null;
    $photo2 = isset($uploaded_photos[1]) ? file_get_contents($uploaded_photos[1]) : null;
    $photo3 = isset($uploaded_photos[2]) ? file_get_contents($uploaded_photos[2]) : null;
    $photo4 = isset($uploaded_photos[3]) ? file_get_contents($uploaded_photos[3]) : null;

    return $stmt->execute([$club_id, $post_content, $photo1, $photo2, $photo3, $photo4]);
}

function handleFileUploads(array $files): array
{
    $uploaded_photos = [];
    $photo_count = count($files['name']);
    $max_photos = 4;

    // Limit the number of photos to upload
    if ($photo_count > $max_photos) {
        $photo_count = $max_photos;
    }

    for ($i = 0; $i < $photo_count; $i++) {
        $photo_name = $files['name'][$i];
        $photo_tmp = $files['tmp_name'][$i];
        $photo_error = $files['error'][$i];

        // Only process files that were uploaded successfully
        if ($photo_error === UPLOAD_ERR_OK) {
            $photo_ext = strtolower(pathinfo($photo_name, PATHINFO_EXTENSION));
            // Add 'jfif' to the allowed extensions
            $allowed_ext = ['jpg', 'jpeg', 'png', 'gif', 'jfif'];

            if (in_array($photo_ext, $allowed_ext)) {
                // Save the uploaded file to the server for blob storage
                $uploaded_photos[] = $photo_tmp; // Store the temporary path for blob storage
            } else {
                echo json_encode(['success' => false, 'error' => 'Invalid file type: ' . $photo_name]);
                exit();
            }
        } elseif ($photo_error !== UPLOAD_ERR_NO_FILE) {
            // If the error is not a "no file" error, return an error
            echo json_encode(['success' => false, 'error' => 'Error uploading file: ' . $photo_name]);
            exit();
        }
    }

    return $uploaded_photos;
}



// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Replace with the actual club ID from session
    $post_content = trim($_POST['post_content']);

    // Validate the post content length
    if (strlen($post_content) > 400) {
        echo json_encode(['success' => false, 'error' => 'Post content cannot exceed 400 characters']);
        exit();
    }

    // Check if post_content is empty and no images are uploaded
    if (empty($post_content) && empty($_FILES['post_images']['name'][0])) {
        echo json_encode(['success' => false, 'error' => 'Post content or images are required']);
        exit();
    }

    // Handle file uploads
    $uploaded_photos = handleFileUploads($_FILES['post_images']);

    // Create the post
    if (createPost($pdo, $club_id, $post_content, $uploaded_photos)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to create post']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}
