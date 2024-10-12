<?php
require_once 'includes/config_session.inc.php';
require_once 'includes/dbh.inc.php';
require_once 'includes/login_view.inc.php';
require_once 'includes/account.inc.php';
if (isset($_GET['club_id']) && is_numeric($_GET['club_id'])) {
    $_SESSION['club_id'] = intval($_GET['club_id']);
} else {
    $_SESSION['club_id'] = 1;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Uniclub</title>
  <link rel="icon" type="image/svg+xml" href="media/Logo.svg" />
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet" />
  <link rel="stylesheet"
    href="style/style.css?<?php echo time(); ?>" />
  <link rel="stylesheet"
    href="style/navbar.css?<?php echo time(); ?>" />
  <link rel="stylesheet"
    href="style/log.css?<?php echo time(); ?>" />
  <link rel="stylesheet"
    href="style/feed.css?<?php echo time(); ?>" />
  <link rel="stylesheet"
    href="style/club.css?<?php echo time(); ?>" />
  <link rel="stylesheet"
    href="style/calendar.css?<?php echo time(); ?>" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">

</head>

<body>
  <!-- -------------------------------------Navbar------------------------------------------>
  <nav>
    <ul class="sidebar">
      <li onclick="HideSidebar()">
        <a><img src="media/close1.svg" /></a>
      </li>
      <li>
        <input class="searchbar" type="text" value="Search..." />
      </li>
      <li><a href="calendar.php">calendar</a></li>
      <li><a href="">support</a></li>
      <?php
          account1($pdo);
?>
    </ul>
    <ul>
      <li><a href="index.php">Uniclub</a></li>
      <li class="hideOnMobile">
        <input class="searchbar" type="text" value="Search..." />
      </li>

      <li class="hideOnMobile"><a href="calendar.php">calendar</a></li>
      <li class="hideOnMobile"><a href="">support</a></li>
      <?php
  account2($pdo);
?>
      <li class="menuButton" onclick="ShowSidebar()">
        <a><img src="media/menu.svg" /></a>
      </li>
    </ul>
  </nav>

  <!-------------------------------------------club----------------------------------------------->
  <div class="club_page">
    <div class="club_photos_container">

    </div>

    <div class="tabs_container">
      <div class="tab" id="posts_tab">Posts</div>
      <div class="tab" id="about_us_tab">About Us</div>
      <div class="tab" id="manage_events_tab">Events</div>
      <div class="tab" id="manage_requests_tab">Request</div>
    </div>


    <div class="tab_content" id="posts_content">
      <div class="feed2">
        <div class="club_feed_container">

        </div>
      </div>
      <div id="scrollToTop" class="arrow_container" style="display: none;">
        <div class="scroll_arrow">
          <div>
            &#8593; <!-- Up arrow character -->
          </div>
        </div>
      </div>
    </div>

    <div class="tab_content" id="about_us_content">

    </div>

    <div class="tab_content" id="manage_events_content">
      <div class="events_tab_container">

      </div>
    </div>

    <div id="ctab3_create">
      <div id="ctab3_2_container">
        <div id="title_container">
          <p>Title:</p>
          <textarea id="event_title" maxlength="26"></textarea>
        </div>
        <div id="details_container">
          <textarea id="details" placeholder="enter event details" maxlength="300"></textarea>
        </div>
        <div id="genre_container">
          <label class="eventDate" for="eventDate">Choose Event Date:</label>
          <input type="text" id="eventDate" name="eventDate" required>
          <div id="inserted_photo2"></div>
          <input type="file" id="event_image_input" name="event_image" style="display: none" accept="image/*"
            multiple="multiple" />
          <img id="post_photo2" class="post_photo" alt="" src="media/gallery-photo.svg" />
          <button id="post_event">save event</button>
        </div>
      </div>
    </div>

    <div class="tab_content" id="manage_requests_content">

    </div>

    <div id="request_popup" style="display: none;">
      <div class="popup_content">
        <p id="popup_request_text"></p>
        <a id="popup_download_link" href="#" download>
        </a>
        <button id="close_popup">Close</button>
      </div>
    </div>


  </div>
  <script src="JavaScript/navbar.js?<?php echo time(); ?>"></script>
  <script src="JavaScript/log.js?<?php echo time(); ?>"></script>
  <script src="JavaScript/club_photos.js?<?php echo time(); ?>"></script>
  <script src="JavaScript/clubFeed.js?<?php echo time(); ?>"></script>
  <!-- <script src="JavaScript/createPost.js?<?php echo time(); ?>">
  </script> -->
  <script src="JavaScript/deletePost.js?<?php echo time(); ?>"></script>
  <script src="JavaScript/clubAboutus.js?<?php echo time(); ?>"></script>
  <script src="JavaScript/createEvent.js?<?php echo time(); ?>"></script>
  <script src="JavaScript/clubEvents.js?<?php echo time(); ?>"></script>
  <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
  <script src="JavaScript/club.js?<?php echo time(); ?>"></script>
  <script src="JavaScript/clubRequest.js?<?php echo time(); ?>"></script>
  <script>
    flatpickr("#eventDate", {
      dateFormat: "Y-m-d", // Desired date format
    });
  </script>
  <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
  <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</body>

</html>