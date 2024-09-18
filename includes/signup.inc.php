<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {

  $email = $_POST["email"];
  $pwd = $_POST["pwd"];

  try {

    require_once 'dbh.inc.php';
    require_once 'signup_model.inc.php';
    require_once 'signup_contr.inc.php' ;

    // error handlers
    $errors = []; 
    if (is_input_empty($email, $pwd)) {
      $errors["empty_input"] = "Fill all the fields!";   
    }
    if (is_email_invalid($email)) {
      $errors["invalid_email"] = "Invalid email used!";
    }
    if (is_email_taken($pdo, $email)) {
      $errors["taken_email"] = "Email already  registered!"; 
    }
 
    require_once 'config_session.inc.php' ;

    if ($errors) {
      $_SESSION["errors_signup"] = $errors;
      header("Location: ../sign_log.php?signup=failed");
      die();
    }

    create_user($pdo, $email, $pwd);
    header("Location: ../sign_log.php?signup=success");

    $pdo = null;
    $stmt = null;

    die();

  } catch (PDOException $e) {
    die("Query failed" . $e->getMessage());
  }

} else {
  header("Location ../index.php");
  die();
}

