<?php
require_once 'includes/config_session.inc.php';
require_once 'includes/signup_view.inc.php';
require_once 'includes/getEvents.php';
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
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">
    <link rel="stylesheet" href="../pfa_final/style/style.css" type="text/css"/>
    <link rel="stylesheet" href="../pfa_final/style/navbar.css" type="text/css"/>
    <link rel="stylesheet" href="../pfa_final/style/calendar.css" type="text/css"/>
  </head>

  <body class="body1">
    <!-- -------------------------------------Navbar------------------------------------------>
    <nav>
        <ul class="sidebar">
          <li onclick="HideSidebar()">
            <a><img src="media/close1.svg" /></a>
          </li>
          <li>
            <input class="searchbar" type="text" value="Search..." />
          </li>
          <li><a href="">calendar</a></li>
          <li><a href="">notifications</a></li>
          <li><a href="">support</a></li>
          <li id="loginButton1" class="loginButton">
            <a href="sign_log.php">account</a>
          </li>
        </ul>
        <ul>
          <li><a href="index.php">Uniclub</a></li>
          <li class="hideOnMobile">
            <input class="searchbar" type="text" value="Search..." />
          </li>
          <li class="hideOnMobile"><a href="">calendar</a></li>
          <li class="hideOnMobile"><a href="">notifications</a></li>
          <li class="hideOnMobile"><a href="">support</a></li>
          <li id="loginButton2" class="loginButton hideOnMobile">
            <a href="sign_log.php">account</a>
          </li>
          <li class="menuButton" onclick="ShowSidebar()">
            <a><img src="media/menu.svg" /></a>
          </li>
        </ul>
    </nav>
    
    <!----------------------------------------calendar------------------------------------------>
    <div class="calendar_container" >
      <!-- <div class="current_day"></div> -->
      <div class="calendar2">
        <div class="calendar_nav">
          <div class="currentMonth">
          </div>
          <div class="icons">
            <span id="prev" class="material-symbols-rounded">chevron_left</span>
            <span id="next" class="material-symbols-rounded">chevron_right</span>
          </div>
        </div>
        <div class="calendar">
          <ul class="weeks">
            <li>Sun </li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed </li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
          </ul>
          <ul class="days"></ul>
        </div>
      </div>
      <div class="currentDayEvents">
        
      </div>
    </div>



    <script src="JavaScript/navbar.js"></script>
    <script src="JavaScript/calendar.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
  </body>
</html>
