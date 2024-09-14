<?php
require_once 'includes/config_session.inc.php';
require_once 'includes/signup_view.inc.php';
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
    <link rel="stylesheet" href="style/style.css" />
    <link rel="stylesheet" href="style/navbar.css" />
    <link rel="stylesheet" href="style/log.css" />
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

    <!------------------------------------Login/signup Popup---------------------------------------->
    <!-- <div id="popup1" class="popup">
      <div id="container" class="container popContent">
        <div class="form-container sign-up-container">
          <form action="includes/signup.inc.php" method="post">
            <h1>Create Account</h1>
            <div class="social-container">
              <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social"
                ><i class="fab fa-google-plus-g"></i
              ></a>
              <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="pwd" />
            <button type="submit">Sign Up</button>
          </form>

          <?php
          check_signup_errors();
          ?>
        </div>
        <div class="form-container sign-in-container">
          <form action="includes/login.inc.php" method="post">
            <h1>Sign in</h1>
            <div class="social-container">
              <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social"
                ><i class="fab fa-google-plus-g"></i
              ></a>
              <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="pwd" />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button class="ghost" id="signIn">Sign In</button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button class="ghost" id="signUp">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <script src="JavaScript/navbar.js"></script>
    <script src="JavaScript/log.js"></script>
    <script>
      // window.onload = function () {
      //   const urlParams = new URLSearchParams(window.location.search);
      //   if (
      //     urlParams.get("popup") === "signup" &&
      //     urlParams.get("error") === "true"
      //   ) {
      //     showLoginPopup();
      //     container.classList.add("right-panel-active");
      //   }
      // };
    </script>
  </body>
</html>
