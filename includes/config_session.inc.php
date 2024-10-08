<?php

ini_set('session.use_only_cookies', 1);
ini_set('session.use_strict_mode', 1);

session_set_cookie_params([
  'lifetime' => 1800,
  'domain' => 'localhost',
  'path' => '/',
  'secure' => true,
  'httponly' => true,
]);

session_start();


// Session regeneration logic
if (isset($_SESSION["user_id"])) {
    // If the user is logged in, check session regeneration
    if (!isset($_SESSION["last_regeneration"])) {
        $_SESSION["last_regeneration"] = time();  // First time, set the time
    } else {
        $interval = 60 * 30;  // 30 minutes
        if (time() - $_SESSION["last_regeneration"] >= $interval) {
            regenerate_session_id();  // Regenerate if the interval is reached
        }
    }
} else {
    // If not logged in, apply session regeneration based on time
    if (!isset($_SESSION["last_regeneration"])) {
        $_SESSION["last_regeneration"] = time();
    } else {
        $interval = 60 * 30;
        if (time() - $_SESSION["last_regeneration"] >= $interval) {
            regenerate_session_id();
        }
    }
}

// Function to regenerate the session ID
function regenerate_session_id()
{
    session_regenerate_id(true);  // True: delete the old session ID
    $_SESSION["last_regeneration"] = time();  // Reset the regeneration time
}
