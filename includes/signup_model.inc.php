<?php

declare(strict_types=1);


function get_email(object $pdo, string $email)
{
    $query = "SELECT email FROM users WHERE email = :email;";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":email", $email);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result;
}

function set_user(object $pdo, string $email, string $pwd, string $fullName, int $phoneNumber)
{
    $query = "INSERT INTO users (email, pwd, phone_number, full_name) VALUES (:email, :pwd, :phoneNumber, :fullName)";
    $stmt = $pdo->prepare($query);

    $options = [
      'cost' => 12
    ];

    $hashedPwd = password_hash($pwd, PASSWORD_BCRYPT, $options);

    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":pwd", $hashedPwd);
    $stmt->bindParam(":phoneNumber", $phoneNumber);
    $stmt->bindParam(":fullName", $fullName);
    $stmt->execute();
}

function register_user(object $pdo, string $studyField, string $facebook, string $instagram, string $linkedin, string $bio, object $cvUploadPath, object $photoUploadPath, string $interestsStr)
{
    $query = "INSERT INTO users (studyField, facebook, instagram, linkedin, bio, cv, profile_image, interests)
                VALUES (:studyField, :facebook, :instagram, :linkedin, :bio, :cv, :profile_image, :interests)";

    $stmt = $pdo->prepare($query);

    // Bind parameters
    $stmt->bindParam(':studyField', $studyField);
    $stmt->bindParam(':facebook', $facebook);
    $stmt->bindParam(':instagram', $instagram);
    $stmt->bindParam(':linkedin', $linkedin);
    $stmt->bindParam(':bio', $bio);
    $stmt->bindParam(':cv', $cvUploadPath);
    $stmt->bindParam(':profile_image', $photoUploadPath);
    $stmt->bindParam(':interests', $interestsStr);
    $stmt->execute();
}
