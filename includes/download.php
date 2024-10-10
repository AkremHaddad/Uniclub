<?php

require_once 'dbh.inc.php'; // Include your database connection

if (isset($_GET['request_id'])) {
    $requestId = $_GET['request_id'];

    try {
        // Fetch the file, MIME type, and original file name from the database
        $query = "SELECT file, mime_type, file_name FROM club_requests WHERE id = :requestId LIMIT 1";
        $stmt = $pdo->prepare($query);
        $stmt->execute([':requestId' => $requestId]);

        $file = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($file) {
            // Extract the file name and extension
            $fileName = $file['file_name']; // Assuming you store the original file name
            $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION); // Get the extension

            // Set the appropriate headers to serve the file
            header('Content-Type: ' . $file['mime_type']);
            header('Content-Disposition: attachment; filename="' . $fileName . '"'); // Include original file name

            // Output the binary file data
            echo $file['file'];
        } else {
            echo "File not found.";
        }
    } catch (PDOException $e) {
        echo "Error fetching file: " . $e->getMessage();
    }
} else {
    echo "No file requested.";
}
