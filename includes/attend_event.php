<?php

require_once 'dbh.inc.php'; // Include your database connection
require_once 'config_session.inc.php';


if (!isset($_SESSION['user_id'])) {
    exit;
}

if (isset($_POST['event_id']) && isset($_POST['action'])) {
    $userId = $_SESSION['user_id']; // Get the logged-in user's ID
    $eventId = $_POST['event_id'];
    $action = $_POST['action']; // 'attend' or 'unattend'

    // Check if the user is already attending
    $query = "SELECT * FROM attending WHERE user_id = :user_id AND event_id = :event_id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':user_id', $userId);
    $stmt->bindParam(':event_id', $eventId);
    $stmt->execute();

    if ($action === 'attend' && $stmt->rowCount() === 0) {
        // User is not attending, so insert a new record
        $insertQuery = "INSERT INTO attending (user_id, event_id, timestamp) VALUES (:user_id, :event_id, NOW())";
        $insertStmt = $pdo->prepare($insertQuery);
        $insertStmt->bindParam(':user_id', $userId);
        $insertStmt->bindParam(':event_id', $eventId);
        if ($insertStmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Event attended']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to attend event']);
        }
    } elseif ($action === 'unattend' && $stmt->rowCount() > 0) {
        // User is attending, so delete the record
        $deleteQuery = "DELETE FROM attending WHERE user_id = :user_id AND event_id = :event_id";
        $deleteStmt = $pdo->prepare($deleteQuery);
        $deleteStmt->bindParam(':user_id', $userId);
        $deleteStmt->bindParam(':event_id', $eventId);
        if ($deleteStmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Event unattended']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to unattend event']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
    }
} else {
    echo json_encode(['error' => 'Invalid request']);
}
