<?php

require_once 'dbh.inc.php';
require_once 'config_session.inc.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$userId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;
isset($_SESSION['club_id']) ? $clubId = $_SESSION['club_id'] : $clubId = null;


function getClubRequests(object $pdo, $userId, $clubId): array
{
    $query = "
        SELECT 
            cr.id,
            cr.userId,
            u.full_name AS userName,
            cr.request_text,
            cr.file
        FROM club_requests cr
        JOIN users u ON cr.userId = u.id
        JOIN club c ON cr.clubId = c.id
        LEFT JOIN clubmembers cm ON c.id = cm.clubId AND cm.userId = :userId
        WHERE cr.clubId = :clubId
    ";

    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":clubId", $clubId);
    $stmt->bindParam(":userId", $userId);
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($result as &$event) {
        if ($event['file']) {
            $event['file'] = base64_encode($event['file']);
        }
    }

    return $result;
}

$requests = getClubRequests($pdo, $userId, $clubId);

header('Content-Type: application/json');
echo json_encode($requests);
