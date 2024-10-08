<?php

// Include the database connection
require_once 'dbh.inc.php';

// Start session to access user information
require_once 'config_session.inc.php';

// Get user ID from session
$userId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

// Get the posted event ID
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->eventId)) {
    echo json_encode(['success' => false, 'error' => 'Event ID is required']);
    exit();
}

$eventId = $data->eventId;

// Check if the user is allowed to delete the event
if (isUserAuthorizedToDelete($pdo, $userId, $eventId)) {
    // Prepare the delete query
    $query = "DELETE FROM event WHERE id = :eventId";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":eventId", $eventId, PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to delete the event']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Unauthorized to delete this event']);
}

function isUserAuthorizedToDelete($pdo, $userId, $eventId)
{
    // Check if the user is the owner of the event or an admin
    $query = "
        SELECT club.ownerId, cm.admin
        FROM event e
        LEFT JOIN club ON e.clubId = club.id
        LEFT JOIN clubmembers cm ON cm.clubId = e.clubId AND cm.userId = :userId
        WHERE e.id = :eventId
    ";

    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":userId", $userId, PDO::PARAM_INT);
    $stmt->bindParam(":eventId", $eventId, PDO::PARAM_INT);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        return ($result['ownerId'] == $userId || $result['admin'] == 1);
    }

    return false; // Event not found or no permissions
}
