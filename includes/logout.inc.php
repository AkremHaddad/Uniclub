<?php
// Start the session
session_start();

// Destroy the session
session_unset();
session_destroy();

// Redirect to login or homepage after logout
header("Location: ../index.php");
exit();
