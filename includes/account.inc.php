<?php

declare(strict_types=1);
require_once 'config_session.inc.php';
require_once 'login_model.inc.php';

function account1(object $pdo) {
  if(isset($_SESSION["user_id"]))
  {
    $user_id = $_SESSION["user_id"];
    $profile_picture = get_user_profile_picture($pdo, $user_id);
    if ($profile_picture) 
    {
      // echo '<li class="user_photo">
      //         <div class="profile_container">
      //           <img class = "user_photo" id="profile_picture" src="' . $profile_picture . '" alt="User Profile Image" />
      //           <ul id="profile_menu" class="profile_menu hidden">
      //             <li><a href="/my_profile">My Profile</a></li>
      //             <li><a href="/bookmarks">My Bookmarks</a></li>
      //             <li><a href="/logout">Log Out</a></li>
      //           </ul>
      //         </div>
      //       </li>
      //       ';
    } else 
    {
      echo '<li><a href="">my account</a></li>';
    }
  }else {
    echo "<li id='loginButton1' class='loginButton'>
             <a href='sign_log.php'>account</a>
           </li>";
  }
}

function account2(object $pdo) {
  if(isset($_SESSION["user_id"]))
  {
    $user_id = $_SESSION["user_id"];
    $profile_picture = get_user_profile_picture($pdo, $user_id);
    if ($profile_picture) 
    {
      echo '<li class="hideOnMobile user_photo"><div class="profile_container">
              <img src="' . $profile_picture . '" alt="User Profile Image" class="profileImage" />
              <ul class="dropdown_menu" id="dropdownMenu">
                <li><a href="/my-profile">My Profile</a></li>
                <li><a href="/my-bookmarks">My Bookmarks</a></li>
                <li><form action="includes/logout.inc.php" method="post"><button class"Iwkms">Log Out</button></form></li>
              </ul></div>
            </li>
            ';
    } else 
    {
      echo '
        <li  class="hideOnMobile user_photo"><div class="profile_container">
          <img class="profileImage" src="media/Default_avatar.svg" alt="User Profile Image" />
          <ul class="dropdown_menu" id="dropdownMenu">
            <li><a href="/my-profile">My Profile</a></li>
            <li><a href="/my-bookmarks">My Bookmarks</a></li>
            <li><form action="includes/logout.inc.php" method="post"><button class"Iwkms">Log Out</button></form></li>
          </ul></div>
        </li>';
    }
  }else 
  {
    echo "<li id='loginButton2' class='loginButton hideOnMobile'>
            <a href='sign_log.php'>account</a>
          </li>";
  }
}

