<?php

require_once 'dbh.inc.php'; // Database connection
require_once 'config_session.inc.php'; // Session configuration

header('Content-Type: application/json');

$userId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

if ($userId) {
    try {
        // Query to fetch unread notifications for the user
        $stmt = $pdo->prepare("SELECT notif_text FROM notifications WHERE user_id = ? AND is_read = 0");
        $stmt->execute([$userId]);
        $notifications = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Extract only the notif_text from the notifications
        $notificationTexts = array_map(function ($notif) {
            return $notif['notif_text'];
        }, $notifications);

        echo json_encode($notificationTexts); // Return an array of notification texts
    } catch (Exception $e) {
        // Log the error message (optional)
        error_log($e->getMessage());
        echo json_encode(['error' => 'Error fetching notifications.']);
    }
} else {
    echo json_encode(['error' => 'User not authenticated.']);
}
