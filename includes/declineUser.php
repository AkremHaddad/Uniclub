<?php

require_once 'dbh.inc.php'; // Database connection
require_once 'config_session.inc.php'; // Session configuration

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Get userId and clubId from the session
$userId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;
$clubId = isset($_SESSION['club_id']) ? $_SESSION['club_id'] : null;

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the user ID from the POST data
    $userIdToDecline = isset($_POST['user_id']) ? $_POST['user_id'] : null;

    if ($userIdToDecline && $clubId) {
        // Start a transaction
        $pdo->beginTransaction();

        try {
            // Prepare and execute the SQL query to mark the request as declined (or delete the request)
            // You can either update a request table or delete an entry from a pending requests table
            $stmt = $pdo->prepare("DELETE FROM club_requests WHERE clubId = ? AND userId = ?");
            $stmt->execute([$clubId, $userIdToDecline]);

            // Commit the transaction
            $pdo->commit();

            echo json_encode(['success' => true, 'message' => 'User request declined successfully.']);
        } catch (Exception $e) {
            // Rollback the transaction in case of error
            $pdo->rollBack();
            echo json_encode(['success' => false, 'message' => 'Error declining user request.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid user ID or club ID.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
