<?php
declare(strict_types=1);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'dbh.inc.php'; // Database connection
require_once 'config_session.inc.php';


function getPostsWithClubInfo(object $pdo, int $club_id):array {
    $query = "
        SELECT 
            posts.id AS postId,
            posts.text AS postText,
            posts.clubId AS clubId,
            posts.photo1, 
            posts.photo2, 
            posts.photo3, 
            posts.photo4,
            club.name AS clubName,
            club.profile_photo AS clubProfilePhoto,
            COALESCE(love_reacts.count, 0) AS loveReacts,
            COALESCE(upvotes.count, 0) AS upvotes,
            COALESCE(downvotes.count, 0) AS downvotes,
            COALESCE(reposts.count, 0) AS reposts,
            COALESCE(bookmarks.count, 0) AS bookmarks
        FROM 
            posts
            JOIN 
            club ON posts.clubId = club.id
            LEFT JOIN 
            (SELECT post_id, COUNT(*) AS count FROM love_reacts GROUP BY post_id) AS love_reacts ON posts.id = love_reacts.post_id
            LEFT JOIN 
            (SELECT post_id, COUNT(*) AS count FROM upvotes GROUP BY post_id) AS upvotes ON posts.id = upvotes.post_id
            LEFT JOIN 
            (SELECT post_id, COUNT(*) AS count FROM downvotes GROUP BY post_id) AS downvotes ON posts.id = downvotes.post_id
            LEFT JOIN 
            (SELECT post_id, COUNT(*) AS count FROM reposts GROUP BY post_id) AS reposts ON posts.id = reposts.post_id
            LEFT JOIN 
            (SELECT post_id, COUNT(*) AS count FROM bookmarks GROUP BY post_id) AS bookmarks ON posts.id = bookmarks.post_id
            WHERE posts.clubId = :club_id
    ";

    $stmt = $pdo->prepare($query);
    $stmt->execute(['club_id' => $club_id]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $posts = [];

    foreach ($result as $row) {
        $posts[] = [
            'id' => $row['postId'],
            'text' => $row['postText'],
            'club_id' => $row['clubId'],
            'photo1' => !empty($row['photo1']) ? base64_encode($row['photo1']) : null,
            'photo2' => !empty($row['photo2']) ? base64_encode($row['photo2']) : null,
            'photo3' => !empty($row['photo3']) ? base64_encode($row['photo3']) : null,
            'photo4' => !empty($row['photo4']) ? base64_encode($row['photo4']) : null,
            'clubName' => $row['clubName'],
            'clubProfilePhoto' => !empty($row['clubProfilePhoto']) ? base64_encode($row['clubProfilePhoto']) : null,
            'loveReacts' => (int)$row['loveReacts'],
            'upvotes' => (int)$row['upvotes'],
            'downvotes' => (int)$row['downvotes'],
            'reposts' => (int)$row['reposts'],
            'bookmarks' => (int)$row['bookmarks'],
            'userLoved' => 0,
            'userUpvoted' => 0,
            'userDownvoted' => 0,
            'userReposted' => 0,
            'userBookmarked' => 0,
            'is_user_admin' => 0
        ];
    }

    return $posts;
}

function getPostsWithClubInfoAndUserReactions(object $pdo, int $userId, int $club_id) {
    $query = "
        SELECT 
            posts.id AS postId,
            posts.text AS postText,
            posts.clubId AS clubId,
            posts.photo1, 
            posts.photo2, 
            posts.photo3, 
            posts.photo4,
            club.name AS clubName,
            club.profile_photo AS clubProfilePhoto,
            COALESCE(love_reacts.count, 0) AS loveReacts,
            COALESCE(upvotes.count, 0) AS upvotes,
            COALESCE(downvotes.count, 0) AS downvotes,
            COALESCE(reposts.count, 0) AS reposts,
            COALESCE(bookmarks.count, 0) AS bookmarks,
            CASE WHEN user_love_reacts.id IS NOT NULL THEN 1 ELSE 0 END AS userLoved,
            CASE WHEN user_upvotes.id IS NOT NULL THEN 1 ELSE 0 END AS userUpvoted,
            CASE WHEN user_downvotes.id IS NOT NULL THEN 1 ELSE 0 END AS userDownvoted,
            CASE WHEN user_reposts.id IS NOT NULL THEN 1 ELSE 0 END AS userReposted,
            CASE WHEN user_bookmarks.id IS NOT NULL THEN 1 ELSE 0 END AS userBookmarked,
            CASE 
                WHEN club.ownerId = :user_id THEN 1
                WHEN cm.admin = 1 THEN 1
                ELSE 0
            END AS is_user_admin
        FROM 
            posts
            JOIN club ON posts.clubId = club.id
            LEFT JOIN (SELECT post_id, COUNT(*) AS count FROM love_reacts GROUP BY post_id) AS love_reacts ON posts.id = love_reacts.post_id
            LEFT JOIN (SELECT post_id, COUNT(*) AS count FROM upvotes GROUP BY post_id) AS upvotes ON posts.id = upvotes.post_id
            LEFT JOIN (SELECT post_id, COUNT(*) AS count FROM downvotes GROUP BY post_id) AS downvotes ON posts.id = downvotes.post_id
            LEFT JOIN (SELECT post_id, COUNT(*) AS count FROM reposts GROUP BY post_id) AS reposts ON posts.id = reposts.post_id
            LEFT JOIN (SELECT post_id, COUNT(*) AS count FROM bookmarks GROUP BY post_id) AS bookmarks ON posts.id = bookmarks.post_id
            LEFT JOIN love_reacts AS user_love_reacts ON posts.id = user_love_reacts.post_id AND user_love_reacts.user_id = :user_id
            LEFT JOIN upvotes AS user_upvotes ON posts.id = user_upvotes.post_id AND user_upvotes.user_id = :user_id
            LEFT JOIN downvotes AS user_downvotes ON posts.id = user_downvotes.post_id AND user_downvotes.user_id = :user_id
            LEFT JOIN reposts AS user_reposts ON posts.id = user_reposts.post_id AND user_reposts.user_id = :user_id
            LEFT JOIN bookmarks AS user_bookmarks ON posts.id = user_bookmarks.post_id AND user_bookmarks.user_id = :user_id
            LEFT JOIN clubmembers cm ON club.id = cm.clubId AND cm.userId = :user_id
        WHERE posts.clubId = :club_id
    ";

    $stmt = $pdo->prepare($query);
    $stmt->execute(['club_id' => $club_id, 'user_id' => $userId]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $posts = [];

    foreach ($result as $row) {
        $posts[] = [
            'id' => $row['postId'],
            'text' => $row['postText'],
            'club_id' => $row['clubId'],
            'photo1' => !empty($row['photo1']) ? base64_encode($row['photo1']) : null,
            'photo2' => !empty($row['photo2']) ? base64_encode($row['photo2']) : null,
            'photo3' => !empty($row['photo3']) ? base64_encode($row['photo3']) : null,
            'photo4' => !empty($row['photo4']) ? base64_encode($row['photo4']) : null,
            'clubName' => $row['clubName'],
            'clubProfilePhoto' => !empty($row['clubProfilePhoto']) ? base64_encode($row['clubProfilePhoto']) : null,
            'loveReacts' => (int)$row['loveReacts'],
            'upvotes' => (int)$row['upvotes'],
            'downvotes' => (int)$row['downvotes'],
            'reposts' => (int)$row['reposts'],
            'bookmarks' => (int)$row['bookmarks'],
            'userLoved' => (bool)$row['userLoved'],
            'userUpvoted' => (bool)$row['userUpvoted'],
            'userDownvoted' => (bool)$row['userDownvoted'],
            'userReposted' => (bool)$row['userReposted'],
            'userBookmarked' => (bool)$row['userBookmarked'],
            'is_user_admin' => (bool)$row['is_user_admin']
        ];
    }

    return $posts;
}



// Assume userId is available from the session or authentication.


if (isset($_SESSION['club_id'])) {
  $club_id = $_SESSION['club_id'];
} else {
  $club_id = 1;
}
 if(isset($_SESSION['user_id']))
{
    $userId = $_SESSION['user_id'];
    $posts = getPostsWithClubInfoAndUserReactions($pdo, $userId, $club_id);
}else{
    $posts = getPostsWithClubInfo($pdo, $club_id);
}


// Return posts as JSON
echo json_encode($posts);