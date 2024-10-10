<?php
require_once 'includes/config_session.inc.php';
require_once 'includes/login_view.inc.php';
require_once 'includes/account.inc.php';
require_once 'includes/dbh.inc.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Clubs</title>
  <link rel="stylesheet"
    href="style/style.css?<?php echo time(); ?>">
  <link rel="stylesheet"
    href="../pfa_final/style/navbar.css?<?php echo time(); ?>"
    type="text/css" />
  <link rel="stylesheet" href="style/club.css?<?php echo time(); ?>">
  <script defer src="JavaScript/clubList.js?<?php echo time(); ?>"></script>
</head>

<body>
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

  <header>
    <h1 class="myclubsheader">My Clubs</h1>
  </header>

  <section id="clubsList">
    <!-- Clubs will be dynamically inserted here -->
  </section>



</body>

</html>