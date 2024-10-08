<?php

declare(strict_types=1);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'dbh.inc.php'; // Database connection
require_once 'config_session.inc.php';

// SQL query to get club bio and members
$query = "
    SELECT 
        c.bio,
        GROUP_CONCAT(u.full_name) AS members
    FROM 
        club c
    LEFT JOIN 
        clubmembers cm ON c.id = cm.clubId
    LEFT JOIN 
        users u ON u.id = cm.userId
    WHERE 
        c.id = :club_id
    GROUP BY 
        c.id
";

// Set the club ID and user ID from session or defaults
$club_id = $_SESSION['club_id'] ?? 1; // Default club ID if not set
$user_id = $_SESSION['user_id'] ?? null; // Default user ID if not set

$stmt = $pdo->prepare($query);
$stmt->execute(['club_id' => $club_id]);
$clubInfo = $stmt->fetch(PDO::FETCH_ASSOC);

// Determine if the user is an admin or the owner
$is_user_admin = 0; // Default to not admin
if ($user_id !== null) {
    // Check if the user is the owner or an admin
    $adminCheckQuery = "
        SELECT 
            CASE 
                WHEN c.ownerId = :user_id THEN 1
                WHEN cm.admin = 1 THEN 1
                ELSE 0
            END AS is_user_admin
        FROM 
            club c
        LEFT JOIN 
            clubmembers cm ON c.id = cm.clubId AND cm.userId = :user_id
        WHERE 
            c.id = :club_id
    ";

    $adminCheckStmt = $pdo->prepare($adminCheckQuery);
    $adminCheckStmt->execute(['club_id' => $club_id, 'user_id' => $user_id]);
    $adminCheck = $adminCheckStmt->fetch(PDO::FETCH_ASSOC);

    $is_user_admin = (bool)($adminCheck['is_user_admin'] ?? 0); // Handle admin state
}

// Prepare the response
$response = [
    'bio' => $clubInfo['bio'] ?? 'No description available.',
    'members' => explode(',', $clubInfo['members'] ?? ''), // Convert concatenated string into an array
    'is_user_admin' => $is_user_admin // Set the user admin state
];

// Set the response content type and return the data as JSON
header('Content-Type: application/json');
echo json_encode($response);
