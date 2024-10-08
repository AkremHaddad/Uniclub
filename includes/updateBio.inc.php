<?php

session_start();
require_once 'dbh.inc.php'; // Include database connection

// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit();
}

// Get the posted bio from the request
$data = json_decode(file_get_contents("php://input"), true);
$newBio = $data['newBio'] ?? '';

// Check if the user is logged in and belongs to a club
if (!isset($_SESSION['user_id']) || !isset($_SESSION['club_id'])) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized. Please log in.']);
    exit();
}

$user_id = $_SESSION['user_id'];
$club_id = $_SESSION['club_id'];

if (strlen($newBio) > 400) {
    echo json_encode(['success' => false, 'message' => 'Bio must not exceed 400 characters']);
    exit();
}

// Check if the user is an admin or club owner
$query = "
    SELECT 
        CASE 
            WHEN c.ownerId = :user_id THEN 1
            WHEN cm.admin = 1 THEN 1
            ELSE 0
        END AS is_user_admin
    FROM 
        club c
    JOIN 
        clubmembers cm ON c.id = cm.clubId
    WHERE 
        c.id = :club_id AND cm.userId = :user_id
";
$stmt = $pdo->prepare($query);
$stmt->execute(['club_id' => $club_id, 'user_id' => $user_id]);
$isUserAdmin = $stmt->fetchColumn();

if ($isUserAdmin) {
    // Update the bio
    $updateQuery = "UPDATE club SET bio = :newBio WHERE id = :club_id";
    $updateStmt = $pdo->prepare($updateQuery);
    if ($updateStmt->execute(['newBio' => $newBio, 'club_id' => $club_id])) {
        echo json_encode(['success' => true, 'message' => 'Bio updated successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update bio']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'You are not authorized to edit this bio']);
}
