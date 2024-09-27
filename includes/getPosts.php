<?php
require_once 'dbh.inc.php'; // Database connection

function getPostsWithClubInfo(object $pdo) {
    $query = "
        SELECT 
            posts.id AS postId,
            posts.text AS postText,
            posts.photo1, 
            posts.photo2, 
            posts.photo3, 
            posts.photo4,
            posts.loveReacts,
            posts.upvotes,
            posts.downvotes,
            posts.reposts,
            posts.bookmarks,
            club.name AS clubName,
            club.profile_photo AS clubProfilePhoto
        FROM 
            posts
        JOIN 
            club ON posts.clubId = club.id
    ";

    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $posts = [];

    foreach ($result as $row) {
        $posts[] = [
            'text' => $row['postText'],
            'loveReacts' => $row['loveReacts'],
            'upvotes' => $row['upvotes'],
            'downvotes' => $row['downvotes'],
            'reposts' => $row['reposts'],
            'bookmarks' => $row['bookmarks'],
            'photo1' => !empty($row['photo1']) ? base64_encode($row['photo1']) : null,
            'photo2' => !empty($row['photo2']) ? base64_encode($row['photo2']) : null,
            'photo3' => !empty($row['photo3']) ? base64_encode($row['photo3']) : null,
            'photo4' => !empty($row['photo4']) ? base64_encode($row['photo4']) : null,
            'clubName' => $row['clubName'],
            'clubProfilePhoto' => !empty($row['clubProfilePhoto']) ? base64_encode($row['clubProfilePhoto']) : null,
        ];
    }

    return $posts;
}

$posts = getPostsWithClubInfo($pdo);

// Return posts as JSON
echo json_encode($posts);
