<?php
require_once 'includes/config_session.inc.php';
require_once 'includes/login_view.inc.php';
require_once 'includes/account.inc.php';
require_once 'includes/dbh.inc.php';
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Uniclub</title>
    <link rel="icon" type="image/svg+xml" href="media/Logo.svg" />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="../pfa_final/style/style.css?<?php echo time(); ?>" type="text/css"/>
    <link rel="stylesheet" href="../pfa_final/style/navbar.css?<?php echo time(); ?>" type="text/css"/>
    <link rel="stylesheet" href="../pfa_final/style/log.css?<?php echo time(); ?>" type="text/css"/>
    <link rel="stylesheet" href="../pfa_final/style/feed.css?<?php echo time(); ?>" type="text/css"/>

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
        <li><a href="">notifications</a></li>
        <li><a href="">support</a></li>
        <?php 
          account1($pdo);
        ?> 
      </ul>
      <ul>
        <li><a href="club.php">Uniclub</a></li>
        <li class="hideOnMobile">
          <input class="searchbar" type="text" value="Search..." />
        </li>
        <li class="hideOnMobile"><a href="calendar.php">calendar</a></li>
        <li class="hideOnMobile"><a href="">notifications</a></li>
        <li class="hideOnMobile"><a href="">support</a></li>
        <?php
          account2($pdo);
        ?>
        <li class="menuButton" onclick="ShowSidebar()">
          <a><img src="media/menu.svg" /></a>
        </li>
      </ul>
    </nav>

    <!-------------------------------------------feed----------------------------------------------->
    <div class="feed">
      <div class="feed-container">

      </div>
    </div>
    
    <script src="JavaScript/navbar.js?<?php echo time(); ?>"></script>
    <script src="JavaScript/log.js?<?php echo time(); ?>"></script>
    <script src="JavaScript/feed.js?<?php echo time(); ?>"></script>

    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
  </body>
</html>
