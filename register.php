<?php
require_once 'includes/config_session.inc.php';
?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Uniclub</title>
    <link rel="stylesheet" href="style/style.css?<?php echo time(); ?>" />
    <link rel="stylesheet" href="style/signup.css?<?php echo time(); ?>" />
  </head>

  <body>
    <!---------------------------------signup section--------------------------------------->
    <form
      action="includes/register1.inc.php"
      method="post"
      enctype="multipart/form-data"
    >
      <div id="part1" class="part1 currentTab">
        <div class="formColumn">
          <label for="studyField">study field:</label>
          <select id="studyField" name="studyField">
            <option value="">Select a study field</option>
            <option value="computer_science">Computer Science</option>
            <option value="engineering">Engineering</option>
            <option value="medicine">Medicine</option>
            <option value="business_administration">
              Business Administration
            </option>
            <option value="law">Law</option>
            <option value="psychology">Psychology</option>
            <option value="education">Education</option>
            <option value="nursing">Nursing</option>
            <option value="architecture">Architecture</option>
            <option value="arts_and_humanities">Arts and Humanities</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="biotechnology">Biotechnology</option>
            <option value="physics">Physics</option>
            <option value="mathematics">Mathematics</option>
            <option value="chemistry">Chemistry</option>
            <option value="economics">Economics</option>
            <option value="political_science">Political Science</option>
            <option value="sociology">Sociology</option>
            <option value="environmental_science">Environmental Science</option>
            <option value="journalism_media_studies">
              Journalism and Media Studies
            </option>
            <option value="other">other</option>
          </select>

          <label for="facebook">Facebook:</label>
          <input type="text" id="facebook" name="facebook" maxlength="32" />

          <label for="instagram">Instagram:</label>
          <input type="text" id="instagram" name="instagram" maxlength="255" />

          <label for="linkedin">LinkedIn:</label>
          <input type="text" id="linkedin" name="linkedin" maxlength="255" />

          <label for="cv">CV:</label>
          <input type="file" id="cv" name="cv" />
        </div>
        <div class="formColumn">
          <div class="profile-pic">
            <label class="-label" for="file">
              <span>Change Image</span>
            </label>
            <input id="file" type="file" name="profile_pic" onchange="loadFile(event)" />
            <img src="media/Default_avatar.svg" id="output" width="200" />
          </div>

          <label for="bio">Bio:</label>
          <textarea id="bio" name="bio"></textarea>

          <button type="button" onclick="nextTab()">next</button>
        </div>
      </div>
      <div id="part2" class="part2 hiddenTab">
        <h2>Choose your Interests</h2>
        <div class="interestContainer">
          <div class="interestColumn">
            <div class="interest" data-interest="Robotics">
              <span>Robotics</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="interest" data-interest="Coding">
              <span>Coding</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="interest" data-interest="Art">
              <span>Art</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="interest" data-interest="Movies">
              <span>Movies</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="interest" data-interest="Gaming">
              <span>Gaming</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="interest" data-interest="Conference">
              <span>Conference</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="interest" data-interest="Soft Skills">
              <span>Soft Skills</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="interest" data-interest="Frontend">
              <span>Frontend</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="interest" data-interest="Backend">
              <span>Backend</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="interest" data-interest="Aerospace">
              <span>Aerospace</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="interest" data-interest="Sports & Fitness">
              <span>Sports & Fitness</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="interest" data-interest="Music & Band">
              <span>Music & Band</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="interest" data-interest="Dance">
              <span>Dance</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="interest" data-interest="Debate & Public Speaking">
              <span>Debate & Public Speaking</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="interest" data-interest="Mathematics & Puzzles">
              <span>Mathematics & Puzzles</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="interest" data-interest="Astronomy & Space Exploration">
              <span>Astronomy & Space Exploration</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="interest" data-interest="Cooking & Culinary Arts">
              <span>Cooking & Culinary Arts</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="interest" data-interest="Fashion & Design">
              <span>Fashion & Design</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="interest" data-interest="Chess & Strategy Games">
              <span>Chess & Strategy Games</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="interest" data-interest="Board Games">
              <span>Board Games</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div
              class="interest"
              data-interest="Volunteering & Community Service"
            >
              <span>Volunteering & Community Service</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="interest" data-interest="Cultural Exchange">
              <span>Cultural Exchange</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="interest" data-interest="Language Learning">
              <span>Language Learning</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="interest" data-interest="Mental Health Awareness">
              <span>Mental Health Awareness</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <div class="interest" data-interest="Health & Wellness">
              <span>Health & Wellness</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <input type="hidden" name="selected_interests" id="selected-interests" value="">
          </div>
        </div>
        <div class="buttonContainer">
          <button type="button" onclick="previousTab()">Back</button>
          <button type="submit" >Register</button>
        </div>
      </div>
    </form>

    <script
      type="module"
      src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
    ></script>
    <script
      nomodule
      src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
    ></script>
    <script src="JavaScript/signup2.js?<?php echo time(); ?>"></script>
  </body>
</html>
