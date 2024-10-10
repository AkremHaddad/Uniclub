<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Club</title>
    <link rel="stylesheet" href="style/createClub.css"> 
</head>

<body>
    <div class="container">
        <h1>Create a Club</h1>
        <form action="includes/createClub.inc.php" method="POST" enctype="multipart/form-data">
            <div class="form-group">
                <label for="clubName">Club Name:</label>
                <input type="text" id="clubName" name="clubName" required>
            </div>

            <div class="form-group">
                <label for="bio">Bio:</label>
                <textarea id="bio" name="bio" rows="4" required></textarea>
            </div>

            <div class="form-group">
                <label for="profilePhoto">Profile Photo:</label>
                <input type="file" id="profilePhoto" name="profilePhoto" accept="image/*" required>
            </div>

            <div class="form-group">
                <label for="coverPhoto">Cover Photo:</label>
                <input type="file" id="coverPhoto" name="coverPhoto" accept="image/*" required>
            </div>



            <button type="submit">Create Club</button>
        </form>
    </div>

    <script src="scripts.js"></script> <!-- Optional: Link to your JavaScript file -->
</body>
</html>
