<?php

declare(strict_types=1);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'dbh.inc.php'; // Database connection
require_once 'config_session.inc.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data (in case it's sent via JSON)
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate post_id (check if it's a valid integer)
    $postId = isset($input['post_id']) ? (int)$input['post_id'] : 0;
    
    if ($postId <= 0) {
        echo json_encode(['success' => false, 'message' => 'Invalid post ID.']);
        exit;
    }

    // Assume you have the user ID from the session
    $userId = $_SESSION['user_id'];

    // Check if the user is authorized to delete the post
    // Logic: Either the user is the creator of the post or an admin in the club
    $query = "
        SELECT p.clubId, c.ownerId, cm.admin
        FROM posts p
        LEFT JOIN club c ON p.clubId = c.id
        LEFT JOIN clubmembers cm ON cm.clubId = c.id AND cm.userId = :user_id
        WHERE p.id = :post_id;
    ";
    
    $stmt = $pdo->prepare($query);
    $stmt->execute(['user_id' => $userId, 'post_id' => $postId]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$result) {
        echo json_encode(['success' => false, 'message' => 'Post not found.']);
        exit;
    }

    // Check if the user is the owner or an admin
    if ($result['ownerId'] !== $userId && !$result['admin']) {
        echo json_encode(['success' => false, 'message' => 'You are not authorized to delete this post.']);
        exit;
    }

    // Proceed with deleting the post
    $deleteQuery = "DELETE FROM posts WHERE id = :post_id";
    $deleteStmt = $pdo->prepare($deleteQuery);

    if ($deleteStmt->execute(['post_id' => $postId])) {
        echo json_encode(['success' => true, 'message' => 'Post deleted successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to delete the post.']);
    }

} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
}
