<?php

declare(strict_types=1);


function get_user(object $pdo, string $email)
{
    $query = "SELECT * FROM users WHERE email = :email;";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":email", $email);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result;
}

function get_user_by_id(object $pdo, int $id)
{
    $query = "SELECT * FROM users WHERE id = :id;";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":id", $id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result;
}

function get_user_profile_picture(object $pdo, int $id)
{
    $query = "SELECT profile_image FROM users WHERE id = :id;";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":id", $id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($result && isset($result['profile_image'])) {
        $imageData = base64_encode($result['profile_image']);
        $imageSrc = 'data:image/jpeg;base64,' . $imageData;
        return $imageSrc;
    } else {
        return null; // Return false if no image is found or an error occurs
    }
}

function updatePostReaction($pdo, $userId, $postId, $action)
{
    try {
        // Define SQL queries based on the action
        switch ($action) {
            case 'love':
                // Check if the user has already liked the post
                $checkQuery = "SELECT * FROM love_reacts WHERE user_id = :userId AND post_id = :postId";
                $stmt = $pdo->prepare($checkQuery);
                $stmt->bindParam(':userId', $userId);
                $stmt->bindParam(':postId', $postId);
                $stmt->execute();

                if ($stmt->rowCount() > 0) {
                    // User has already liked, remove the like
                    $deleteQuery = "DELETE FROM love_reacts WHERE user_id = :userId AND post_id = :postId";
                    $stmt = $pdo->prepare($deleteQuery);
                } else {
                    // User hasn't liked yet, insert the like
                    $insertQuery = "INSERT INTO love_reacts (user_id, post_id) VALUES (:userId, :postId)";
                    $stmt = $pdo->prepare($insertQuery);
                }
                break;

            case 'upvote':
                // Similar logic for upvotes
                $checkQuery = "SELECT * FROM upvotes WHERE user_id = :userId AND post_id = :postId";
                $stmt = $pdo->prepare($checkQuery);
                $stmt->bindParam(':userId', $userId);
                $stmt->bindParam(':postId', $postId);
                $stmt->execute();

                if ($stmt->rowCount() > 0) {
                    // User has already upvoted, remove the upvote
                    $deleteQuery = "DELETE FROM upvotes WHERE user_id = :userId AND post_id = :postId";
                    $stmt = $pdo->prepare($deleteQuery);
                } else {
                    // User hasn't upvoted yet, insert the upvote
                    $insertQuery = "INSERT INTO upvotes (user_id, post_id) VALUES (:userId, :postId)";
                    $stmt = $pdo->prepare($insertQuery);
                }
                break;

            case 'downvote':
                // Similar logic for downvotes
                $checkQuery = "SELECT * FROM downvotes WHERE user_id = :userId AND post_id = :postId";
                $stmt = $pdo->prepare($checkQuery);
                $stmt->bindParam(':userId', $userId);
                $stmt->bindParam(':postId', $postId);
                $stmt->execute();

                if ($stmt->rowCount() > 0) {
                    // User has already downvoted, remove the downvote
                    $deleteQuery = "DELETE FROM downvotes WHERE user_id = :userId AND post_id = :postId";
                    $stmt = $pdo->prepare($deleteQuery);
                } else {
                    // User hasn't downvoted yet, insert the downvote
                    $insertQuery = "INSERT INTO downvotes (user_id, post_id) VALUES (:userId, :postId)";
                    $stmt = $pdo->prepare($insertQuery);
                }
                break;

            case 'repost':
                // Check if the user has already reposted the post
                $checkQuery = "SELECT * FROM reposts WHERE user_id = :userId AND post_id = :postId";
                $stmt = $pdo->prepare($checkQuery);
                $stmt->bindParam(':userId', $userId);
                $stmt->bindParam(':postId', $postId);
                $stmt->execute();

                if ($stmt->rowCount() > 0) {
                    // User has already reposted, you can decide to remove it or ignore
                    $deleteQuery = "DELETE FROM reposts WHERE user_id = :userId AND post_id = :postId";
                    $stmt = $pdo->prepare($deleteQuery);
                } else {
                    // User hasn't reposted yet, insert the repost
                    $insertQuery = "INSERT INTO reposts (user_id, post_id) VALUES (:userId, :postId)";
                    $stmt = $pdo->prepare($insertQuery);
                }
                break;

            case 'bookmark':
                // Check if the user has already bookmarked the post
                $checkQuery = "SELECT * FROM bookmarks WHERE user_id = :userId AND post_id = :postId";
                $stmt = $pdo->prepare($checkQuery);
                $stmt->bindParam(':userId', $userId);
                $stmt->bindParam(':postId', $postId);
                $stmt->execute();

                if ($stmt->rowCount() > 0) {
                    // User has already bookmarked, remove the bookmark
                    $deleteQuery = "DELETE FROM bookmarks WHERE user_id = :userId AND post_id = :postId";
                    $stmt = $pdo->prepare($deleteQuery);
                } else {
                    // User hasn't bookmarked yet, insert the bookmark
                    $insertQuery = "INSERT INTO bookmarks (user_id, post_id) VALUES (:userId, :postId)";
                    $stmt = $pdo->prepare($insertQuery);
                }
                break;

            default:
                return; // Invalid action
        }

        // Bind parameters and execute the statement
        $stmt->bindParam(':userId', $userId);
        $stmt->bindParam(':postId', $postId);
        $stmt->execute();

        // Optionally, return the new count for the action
        return true; // You can return more specific information if needed

    } catch (PDOException $e) {
        // Handle any errors
        echo "Error: " . $e->getMessage();
        return false;
    }
}
