<?php
// Include the database connection and get the date from query
require_once 'dbh.inc.php';


if (isset($_GET['date'])) {
    $selectedDate = $_GET['date'];

    // Call the function to get events
    $events = getEventByDate($pdo, $selectedDate);

    // Return events as JSON
    echo json_encode($events);
}

function getEventByDate(object $pdo, $selectedDate) {
    $query = "SELECT id, title, description1, photos, date1, loveReacts, upvotes, downvotes, bookmarks FROM event WHERE date1 = :selectedDate";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":selectedDate", $selectedDate);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($result as &$event) {
        if ($event['photos']) {
            $event['photos'] = base64_encode($event['photos']);
        }
    }
    return $result;
}