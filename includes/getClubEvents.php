<?php

// Include the database connection and get the date from the query
require_once 'dbh.inc.php';

// Start session to access user information
require_once 'config_session.inc.php';

// Get user ID from session
isset($_SESSION['user_id']) ? $userId = $_SESSION['user_id'] : $userId = null;
isset($_SESSION['club_id']) ? $clubId = $_SESSION['club_id'] : $clubId = null;

// Fetch events
$events = getEvent($pdo, $userId, $clubId);
echo json_encode($events);

function getEvent(object $pdo, $userId, $clubId)
{
    // Join event, attending, and club tables to check attendance status and admin rights
    $query = "
      SELECT 
          e.id, e.title, e.description1, e.photos, e.date1, 
          c.name AS clubName, c.profile_photo AS clubProfilePhoto,
          (SELECT COUNT(att.id) FROM attending att WHERE att.event_id = e.id) AS attendeeCount
      FROM event e
      LEFT JOIN club c ON e.clubId = c.id
      LEFT JOIN clubmembers cm ON cm.clubId = e.clubId AND cm.userId = :userId
      WHERE e.clubId = :clubId;
    ";

    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":userId", $userId);
    $stmt->bindParam(":clubId", $clubId);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Encode photos and club profile photo to base64 if they exist
    foreach ($result as &$event) {
        if (!empty($event['photos'])) {
            $event['photos'] = base64_encode($event['photos']);
        }
        if (!empty($event['clubProfilePhoto'])) {
            $event['clubProfilePhoto'] = base64_encode($event['clubProfilePhoto']);
        }
    }

    return $result;
}
