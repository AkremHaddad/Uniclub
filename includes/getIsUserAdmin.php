<?php

require_once 'dbh.inc.php';
require_once 'config_session.inc.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$userId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;
$clubId = $_SESSION['club_id'];

function getIsUserAdmin(object $pdo, $userId, $clubId)
{
    $query = "
        SELECT            
            CASE 
                WHEN c.ownerId = :userId THEN 1
                WHEN cm.admin = 1 THEN 1
                ELSE 0
            END AS is_user_admin
        FROM club c
        LEFT JOIN clubmembers cm ON c.id = cm.clubId AND cm.userId = :userId
        WHERE c.id = :clubId
    ";

    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":clubId", $clubId);
    $stmt->bindParam(":userId", $userId);
    $stmt->execute();

    return $stmt->fetch(PDO::FETCH_ASSOC)['is_user_admin'];
}

$isUserAdmin = getIsUserAdmin($pdo, $userId, $clubId);

header('Content-Type: application/json');
echo json_encode(['is_user_admin' => $isUserAdmin]);
