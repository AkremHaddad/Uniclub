<?php

declare(strict_types=1);
require_once 'config_session.inc.php';
require_once 'login_model.inc.php';

function account1(object $pdo)
{
    if (isset($_SESSION["user_id"])) {
        echo '
        
           <li><a href="/my_profile">My Profile</a></li>
           <li><a href="/bookmarks">My Bookmarks</a></li>
           <li><a href="createClub.php">create club</a></li>
            <li><a href="myClubs.php">my clubs</a></li>
           <li><form action="includes/logout.inc.php" method="post"><button class="dropdown_menu_button">Log Out</button></form></li>
     ';
    } else {
        echo "<li id='loginButton1' class='loginButton'>
             <a href='sign_log.php'>account</a>
           </li>";
    }
}

function account2(object $pdo)
{
    if (isset($_SESSION["user_id"])) {
        $user_id = $_SESSION["user_id"];
        $profile_picture = get_user_profile_picture($pdo, $user_id);
        if ($profile_picture) {
            echo '
            
            <li ><div id="notification_container" onclick="getUnreadNotifications()" class="notification_container">
              <a>notifications</a>
              <ul class="dropdown_menu" id="notificationDropdownMenu">
                <li><div id="notifContainer" class="notification-list"></div></li>
              </ul></div>
            </li>
            
            <li class="hideOnMobile user_photo"><div class="profile_container">
              <img id="profileImage1" src="' . $profile_picture . '" alt="User Profile Image" class="profileImage" />
              <ul class="dropdown_menu" id="dropdownMenu">
                <li><a href="/my-profile">My Profile</a></li>
                <li><a href="/my-bookmarks">My Bookmarks</a></li>
                <li><a href="createClub.php">create club</a></li>
                <li><a href="myClubs.php">my clubs</a></li>
                <li><form action="includes/logout.inc.php" method="post"><button class="dropdown_menu_button">Log Out</button></form></li>
              </ul></div>
            </li>

            ';
        } else {
            echo '
        <li  class="hideOnMobile user_photo"><div class="profile_container">
          <img  id="profileImage1" class="profileImage" src="media/Default_avatar.svg" alt="User Profile Image" />
          <ul class="dropdown_menu" id="dropdownMenu">
            <li><a href="/my-profile">My Profile</a></li>
            <li><a href="/my-bookmarks">My Bookmarks</a></li>
            <li><a href="createClub.php">create club</a></li>
            <li><a href="myClubs.php">my clubs</a></li>
            <li><form action="includes/logout.inc.php" method="post"><button class="dropdown_menu_button">Log Out</button></form></li>
          </ul></div>
        </li>';
        }
    } else {
        echo "<li id='loginButton2' class='loginButton hideOnMobile'>
            <a href='sign_log.php'>account</a>
          </li>";
    }
}
