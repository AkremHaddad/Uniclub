<?php

declare(strict_types=1);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'dbh.inc.php'; // Database connection
require_once 'config_session.inc.php';



function getProfileCover(object $pdo, int $club_id): array {
      $query = "
        SELECT
            c.name AS club_name,
            c.cover_photo,
            c.profile_photo,
            COUNT(m.userId) AS member_count
        FROM
            club c
        LEFT JOIN clubmembers m ON
            c.id = m.clubId
        WHERE
            c.id = :club_id
        GROUP BY
            c.id;
      ";

    $stmt = $pdo->prepare($query);
    $stmt->execute(['club_id' => $club_id]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        return [
            'profile_photo' => !empty($row['profile_photo']) ? base64_encode($row['profile_photo']) : null,
            'cover_photo' => !empty($row['cover_photo']) ? base64_encode($row['cover_photo']) : null,
            'club_name' => $row['club_name'],
            'member_count' => !empty($row['member_count']) ? $row['member_count'] : 0,
        ];
    }

    // Return an empty array if no result found
    return [
      'profile_photo' => !empty($row['c.profile_photo']) ? base64_encode($row['c.profile_photo']) : null,
      'cover_photo' => !empty($row['c.cover_photo']) ? base64_encode($row['c.cover_photo']) : null,
      'club_name' => 'akrem',
      'member_count' => '123',
  ];

}

// Check if 'club_id' exists in session or set default
if (isset($_SESSION['club_id'])) {
  $club_id = $_SESSION['club_id'];
} else {
  $club_id = 1;
}

// Fetch profile cover information
$ProfileCover = getProfileCover($pdo, $club_id);

// Return the result as JSON
echo json_encode($ProfileCover);

