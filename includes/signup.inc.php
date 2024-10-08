<?php

// if ($_SERVER["REQUEST_METHOD"] === "POST") {

//   $input = json_decode(file_get_contents('php://input'), true);

//   // Extract the form values
//   $fullName = trim($input['fullName']);
//   $phoneNumber = trim($input['phoneNumber']);
//   $email = trim($input['email']);
//   $pwd = trim($input['password']);

//   try {

//     require_once 'dbh.inc.php';
//     require_once 'signup_model.inc.php';
//     require_once 'signup_contr.inc.php' ;

//     // error handlers
//     $errors = [];
//     if (is_input_empty($email, $pwd)) {
//       $errors["empty_input"] = "Fill all the fields!";
//     }
//     if (is_email_invalid($email)) {
//       $errors["invalid_email"] = "Invalid email used!";
//     }
//     if (is_email_taken($pdo, $email)) {
//       $errors["taken_email"] = "Email already  registered!";
//     }

//     require_once 'config_session.inc.php' ;

//     if ($errors) {
//       $_SESSION["errors_signup"] = $errors;
//       header("Location: ../sign_log.php?signup=failed");
//       die();
//     }

//     create_user($pdo, $email, $pwd, $fullName, $phoneNumber);
//     header("Location: ../sign_log.php?signup=success");

//     $pdo = null;
//     $stmt = null;

//     die();

//   } catch (PDOException $e) {
//     die("Query failed" . $e->getMessage());
//   }

// } else {
//   header("Location ../index.php");
//   die();
// }

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    require_once 'config_session.inc.php' ;

    // Get the JSON input from the fetch request
    $input = json_decode(file_get_contents('php://input'), true);

    // Extract the form values
    $fullName = trim($input['fullName']);
    $phoneNumber = trim($input['phoneNumber']);
    $email = trim($input['email']);
    $pwd = trim($input['pwd']);


    try {
        require_once 'dbh.inc.php';
        require_once 'signup_model.inc.php';
        require_once 'signup_contr.inc.php';

        // Error handlers
        $errors = [];
        if (is_input_empty($email, $pwd, $fullName, $phoneNumber)) {
            $errors["empty_input"] = "Fill all the fields!";
        }
        if (is_email_invalid($email)) {
            $errors["invalid_email"] = "Invalid email used!";
        }
        if (is_email_taken($pdo, $email)) {
            $errors["taken_email"] = "Email already registered!";
        }
        if (!is_numeric($phoneNumber)) {
            $errors["invalid_phone_number"] = "Enter a valid phone number.";
        }

        if ($errors) {
            // Return the errors as JSON to the frontend
            echo json_encode([
              "success" => false,
              "errors" => $errors
            ]);
            die();
        }

        // Create the user
        create_user($pdo, $email, $pwd, $fullName, $phoneNumber);

        // Return success message as JSON
        require_once 'login_model.inc.php';

        $result = get_user($pdo, $email);
        $_SESSION["user_id"] = $result["id"];
        echo json_encode([
          "success" => true,
          "message" => "Signup successful!"
        ]);

        $pdo = null;
        die();

    } catch (PDOException $e) {
        // Return error message as JSON
        echo json_encode([
          "success" => false,
          "message" => "An error occurred: " . $e->getMessage()
        ]);
        die();
    }

} else {
    // Return invalid request message as JSON
    echo json_encode([
      "success" => false,
      "message" => "Invalid request."
    ]);
    die();
}
