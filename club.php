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
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="../pfa_final/style/style.css?<?php echo time(); ?>" type="text/css"/>
    <link rel="stylesheet" href="../pfa_final/style/navbar.css?<?php echo time(); ?>" type="text/css"/>
    <link rel="stylesheet" href="../pfa_final/style/log.css?<?php echo time(); ?>" type="text/css"/>
    <link rel="stylesheet" href="../pfa_final/style/feed.css?<?php echo time(); ?>" type="text/css"/>
    <link rel="stylesheet" href="../pfa_final/style/club.css?<?php echo time(); ?>" type="text/css"/>
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
        <li><a href="index.php">Uniclub</a></li>
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

    <!-------------------------------------------club----------------------------------------------->
    <div class="club_page">
      <div class="club_photos_container">
        
      </div>
      <div class="tabs_container">
        <div class="tab" id="posts_tab">Posts</div>
        <div class="tab" id="about_us_tab">About Us</div>
        <div class="tab" id="manage_events_tab">Manage Events</div>
        <div class="tab" id="manage_requests_tab">Manage Requests</div>
      </div>


      <div class="tab_content" id="posts_content">
        <div class="feed2">
        
          <div class="club_feed_container">

          </div>
        </div>
        <div id="scrollToTop" class="arrow_container" style="display: none;">
          <div  class="scroll_arrow">
            <div>
              &#8593; <!-- Up arrow character -->
            </div>
          </div>
        </div>
      </div>
      <div class="tab_content" id="about_us_content" >
        
      </div>
      <div class="tab_content" id="manage_events_content" >
        <div class="events_tab_container">
          <button id="create_event">Create event</button>
          <div class="event_container">
            <div class="event_part1">
              <div class="event_name">
                <p>Event : event name</p>
              </div>
              <button class="edit_event">edit</button>
              <button class="delete_event">delete</button>
            </div>
            <div>
              <p class="event_description">
                Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div>
              <p class="event_genre">Genres : lorem/ipsum/dolor</p>
            </div>
          </div>
          <div class="event_container">
            <div class="event_part1">
              <div class="event_name">
                <p class="event_name_txt">Event : event name</p>
              </div>
              <button class="edit_event">edit</button>
              <button class="delete_event">delete</button>
            </div>
            <div>
              <p class="event_description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div>
              <p class="event_genre">Genres : lorem/ipsum/dolor</p>
            </div>
          </div>
          <div class="event_container">
            <div class="event_part1">
              <div class="event_name">
                <p class="event_name_txt">Event : event name</p>
              </div>
              <button class="edit_event">edit</button>
              <button class="delete_event">delete</button>
            </div>
            <div>
              <p class="event_description">
                Details: one piece is the greatest piece of fiction written by
                mankind, Eichero Oda, the author of one piece, managed to carry
                shonen jump over the period of 56 years, thank you oda!
              </p>
            </div>
            <div>
              <p class="event_genre">Genres : peak/fiction/goat</p>
            </div>
          </div>
        </div>
      </div>
      <div id="ctab3_create">
        <div id="ctab3_2_container">
          <div id="title_container">
            <p>Title:</p>
            <textarea id="event_title" maxlength="26"></textarea>
          </div>
          <div id="details_container">
            <textarea
              id="details"
              placeholder="enter event details"
              maxlength="300"
            ></textarea>
          </div>
          <div id="genre_container">
            <textarea
              name="genre"
              id="event_genre"
              maxlength="40"
              placeholder="enter genre"
            ></textarea>
            <button id="post_event">save event</button>
          </div>
        </div>
      </div>
      <div id="ctab3_delete">
        <div id="ctab3_delete_container">
          <p>delete this event?</p>
          <div>
            <button id="confirm_delete_event">confirm</button>
            <button class="cancel">cancel</button>
          </div>
        </div>
      </div>
      <div class="tab_content"  id="manage_requests_content" >
        <div id="requests_tab">
          <div id="requests_tabs">
            <div id="request_tab1" class="request_tab">
              <p id="r_tab1">Requests to join the club</p>
            </div>
            <div id="request_tab2" class="request_tab">
              <p id="r_tab2">Request disabling the club</p>
            </div>
            <div id="request_tab3" class="request_tab">
              <p id="r_tab3">Request deleting the club</p>
            </div>
          </div>
        
          <div id="request1" class="request">
            <div id="request1_container">
              <div class="member_request">
                <p class="member_name">mouhamed aziz ben yasmina</p>
                <button id="div_acc">
                  <img src="media/accept.svg" alt="" class="accept" />
                </button>
                <button id="div_clo">
                  <img src="media/close.svg" alt="" class="decline" />
                </button>
              </div>
              <div class="member_request">
                <p class="member_name">Akrem Haddad</p>
                <button id="div_acc">
                  <img src="media/accept.svg" alt="" class="accept" />
                </button>
                <button id="div_clo">
                  <img src="media/close.svg" alt="" class="decline" />
                </button>
              </div>
              <div class="member_request">
                <p class="member_name">Saber Berriche</p>
                <button id="div_acc">
                  <img src="media/accept.svg" alt="" class="accept" />
                </button>
                <button id="div_clo">
                  <img src="media/close.svg" alt="" class="decline" />
                </button>
              </div>
              <div class="member_request">
                <p class="member_name">Islem ben Khalifa</p>
                <button id="div_acc">
                  <img src="media/accept.svg" alt="" class="accept" />
                </button>
                <button id="div_clo">
                  <img src="media/close.svg" alt="" class="decline" />
                </button>
              </div>
              <div class="member_request">
                <p class="member_name">Ghassan Achour</p>
                <button id="div_acc">
                  <img src="media/accept.svg" alt="" class="accept" />
                </button>
                <button id="div_clo">
                  <img src="media/close.svg" alt="" class="decline" />
                </button>
              </div>
            </div>
          </div>
          <div id="request2" class="request">
            <div class="request2and3_container">
              <p>why you wanna disable the club?</p>
              <textarea
                maxlength="400"
                placeholder="Write here"
                id="disable_txt"
              ></textarea>
              <div class="inp_butt_container">
                <input type="file" id="disable_file" />
                <button id="disable_club">confirm</button>
              </div>
            </div>
          </div>
          <div id="request3" class="request">
            <div class="request2and3_container">
              <p>why you wanna delete the club?</p>
              <textarea
                id="delete_txt"
                maxlength="400"
                placeholder="Write here"
              ></textarea>
              <div class="inp_butt_container">
                <input type="file" id="delete_file" />
                <button id="delete_club">confirm</button>
              </div>
            </div>
          </div>
        </div>
        <div id="ctab4_accept">
          <div id="ctab4_accept_container">
            <p>accept request?</p>
            <div>
              <button id="confirm_accept_member">confirm</button>
              <button class="cancel">cancel</button>
            </div>
          </div>
        </div>
        <div id="ctab4_decline">
          <div id="ctab4_decline_container">
            <p>decline request?</p>
            <div>
              <button id="confirm_decline_member">confirm</button>
              <button class="cancel">cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script src="JavaScript/navbar.js?<?php echo time(); ?>"></script>
    <script src="JavaScript/log.js?<?php echo time(); ?>"></script>
    <script src="JavaScript/club_photos.js?<?php echo time(); ?>"></script>
    <script src="JavaScript/clubFeed.js?<?php echo time(); ?>"></script>
    <script src="JavaScript/club.js?<?php echo time(); ?>"></script>
    <script src="JavaScript/createPost.js?<?php echo time(); ?>"></script>
    <script src="JavaScript/deletePost.js?<?php echo time(); ?>"></script>
    <script src="JavaScript/clubAboutus.js?<?php echo time(); ?>"></script>

    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
  </body>
</html>
