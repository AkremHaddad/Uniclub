<?php

declare(strict_types=1);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'dbh.inc.php'; // Database connection
require_once 'config_session.inc.php';

$data = $_POST; // Use $_POST for form data

if (isset($_SESSION['club_id']) && isset($_SESSION['user_id'])) {
    $clubId = $_SESSION['club_id'];
    $userId = $_SESSION['user_id'];
} else {
    echo json_encode(['success' => false, 'error' => 'You do not have permission to post.']);
    die();
}

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

    return $result && ($result['ownerId'] === $userId || $result['isAdmin'] > 0);
}

if (!canUserPost($pdo, $clubId, $userId)) {
    echo json_encode(['success' => false, 'error' => 'You do not have permission to post.']);
    die();
}

// Check if all required fields are present
if (isset($data['title'], $data['details'], $data['eventDate'])) {
    $title = $data['title'];
    $details = $data['details'];
    $eventDate = $data['eventDate'];

    // Initialize variable for photo content
    $photoContent = null;

    // Optional file handling
    if (isset($_FILES['event_photo']) && $_FILES['event_photo']['error'] === UPLOAD_ERR_OK) {
        $photoTmpName = $_FILES['event_photo']['tmp_name'];
        $photoContent = file_get_contents($photoTmpName); // Read file content
        $photoName = $_FILES['event_photo']['name'];
        $photoExt = strtolower(pathinfo($photoName, PATHINFO_EXTENSION));
        $allowedExt = ['jpg', 'jpeg', 'png', 'gif', 'jfif'];

        if (!in_array($photoExt, $allowedExt)) {
            echo json_encode(['success' => false, 'error' => 'Invalid file type: ' . $photoName]);
            exit();
        }
    }

    // Prepare the SQL query to insert the event (with or without photo)
    $query = "INSERT INTO event (clubId, title, description1, date1, photos) VALUES (:clubId, :title, :details, :eventDate, :photoPath)";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':clubId', $clubId);
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':details', $details);
    $stmt->bindParam(':eventDate', $eventDate);

    // Bind photo content (can be null if no photo was uploaded)
    $stmt->bindParam(':photoPath', $photoContent, PDO::PARAM_LOB); // Use PDO::PARAM_LOB for large objects

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Database error.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'All required fields must be provided.']);
}
