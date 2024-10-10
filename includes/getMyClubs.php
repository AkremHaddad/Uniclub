<?php

require_once 'dbh.inc.php'; // Database connection
require_once 'config_session.inc.php'; // Session configuration

header('Content-Type: application/json');

// Get the current logged-in user ID
$userId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

if ($userId) {
    try {
        // Prepare SQL query to get the clubs where the user is either the owner or a member
        $stmt = $pdo->prepare("
            SELECT c.id, c.name
            FROM club c
            WHERE c.ownerId = ? 
            OR EXISTS (
                SELECT 1 FROM clubmembers cm WHERE cm.clubId = c.id AND cm.userId = ?
            )
        ");

        // Execute the query with the user ID as the parameter for both owner and member checks
        $stmt->execute([$userId, $userId]);
        $clubs = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Return the clubs (id and name) as a JSON response
        echo json_encode($clubs);
    } catch (Exception $e) {
        // Handle errors
        echo json_encode(['error' => 'Error fetching clubs.']);
    }
} else {
    echo json_encode(['error' => 'User not logged in.']);
}
