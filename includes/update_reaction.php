<?php

declare(strict_types=1);
require_once 'login_model.inc.php';
require_once 'config_session.inc.php';
require_once 'dbh.inc.php';


if (isset($_SESSION['user_id'])) { // Check if user is logged in

    $userId = $_SESSION['user_id']; // Assuming user ID is stored in the session
    $data = json_decode(file_get_contents('php://input'), true); // Get JSON data from AJAX request
    $postId = $data['postId'];
    $action = $data['action'];

    // Call the function to update the reaction
    $result = updatePostReaction($pdo, $userId, $postId, $action);

    // Return a response (can include updated counts or success message)
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Action updated successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error updating action.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'User not logged in.']);
}
