<?php

// Include the database connection and get the date from the query
require_once 'dbh.inc.php';
require_once 'config_session.inc.php';

$userId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

if (isset($_GET['date'])) {
    $selectedDate = $_GET['date'];

    $events = getEventByDateAndAttendance($pdo, $selectedDate, $userId);

    // Return events as JSON
    echo json_encode($events);
}

function getEventByDateAndAttendance(object $pdo, $selectedDate, $userId)
{
    // SQL query to fetch event details and count the number of attendees
    $query = "
        SELECT 
            e.id, e.title, e.description1, e.photos, e.date1, 
            c.name AS clubName, c.profile_photo AS clubProfilePhoto, c.id as clubId,
            CASE WHEN a.id IS NOT NULL THEN true ELSE false END as isAttending,
            (SELECT COUNT(att.id) FROM attending att WHERE att.event_id = e.id) AS attendeeCount
        FROM event e
        LEFT JOIN attending a ON e.id = a.event_id AND a.user_id = :userId
        LEFT JOIN club c ON e.clubId = c.id
        WHERE e.date1 = :selectedDate
        GROUP BY e.id, e.title, e.description1, e.photos, e.date1, c.name, c.profile_photo, c.id, a.id
    ";

    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":selectedDate", $selectedDate);
    $stmt->bindParam(":userId", $userId);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($result as &$event) {
        if ($event['photos']) {
            $event['photos'] = base64_encode($event['photos']);
        }
        if (!empty($event['clubProfilePhoto'])) {
            $event['clubProfilePhoto'] = base64_encode($event['clubProfilePhoto']);
        }
    }

    return $result;
}
