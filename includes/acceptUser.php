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
    $userIdToAccept = isset($_POST['user_id']) ? $_POST['user_id'] : null;

    if ($userIdToAccept && $clubId) {
        // Start a transaction
        $pdo->beginTransaction();

        try {
            // Prepare and execute the SQL query to add the user to clubmembers
            $stmt = $pdo->prepare("INSERT INTO clubmembers (clubId, userId) VALUES (?, ?)");
            $stmt->execute([$clubId, $userIdToAccept]);

            // Retrieve the club name
            $stmt2 = $pdo->prepare("SELECT name FROM club WHERE id = ?");
            $stmt2->execute([$clubId]);
            $club = $stmt2->fetch(PDO::FETCH_ASSOC);

            // After accepting, delete the request from the club_requests table
            $deleteStmt = $pdo->prepare("DELETE FROM club_requests WHERE clubId = ? AND userId = ?");
            $deleteStmt->execute([$clubId, $userIdToAccept]);

            // Create a notification for the user who was accepted
            if ($club) {
                $notificationText = "You have been accepted into: " . $club['name'];
                $notificationStmt = $pdo->prepare("INSERT INTO notifications (user_id, notif_text) VALUES (?, ?)");
                $notificationStmt->execute([$userIdToAccept, $notificationText]);
            }

            // Commit the transaction
            $pdo->commit();

            echo json_encode(['success' => true, 'message' => 'User added to club members successfully, request removed, and notification sent.']);
        } catch (Exception $e) {
            // Rollback the transaction in case of error
            $pdo->rollBack();
            echo json_encode(['success' => false, 'message' => 'Error accepting user into the club and removing request.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid user ID or club ID.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
