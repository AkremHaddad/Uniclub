<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {

  $email = $_POST["email"];
  $pwd = $_POST["pwd"];
  
  try {

    require_once 'dbh.inc.php';
    require_once 'login_model.inc.php';
    require_once 'login_contr.inc.php' ;

    // error handlers
    $errors = []; 
    if (is_input_empty($email, $pwd)) {
      $errors["empty_input"] = "Fill all the fields!";   
    }

    $result = get_user($pdo, $email);

    if (is_email_wrong($result)){
      $errors["login_incorrect"] = "incorrect login info";
    }
    
    if (!is_email_wrong($result) && is_password_wrong($pwd, $result["pwd"])){
      $errors["login_incorrect"] = "incorrect login info";
    }

    require_once 'config_session.inc.php';

    if ($errors) {
      $_SESSION["errors_login"] = $errors;
      header("Location: ../sign_log.php?login=failed");
      die();
    }


    $new_session_id = session_create_id();
    $sessionId = $new_session_id . "_" . $result["id"];
    session_id($sessionId);

    $_SESSION["user_id"] = $result["id"];
    $_SESSION["user_email"]=htmlspecialchars($result["email"]);
    $_SESSION["last_regeneration"] = time();
    
    header("Location: ../index.php?login=success");
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
