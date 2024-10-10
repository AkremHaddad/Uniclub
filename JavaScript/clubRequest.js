fetch("includes/getClubRequests.php")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((requests) => {
    const requestTabContainer = document.querySelector(
      "#manage_requests_content"
    );
    var a = ``;

    fetch("includes/getIsUserAdmin.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const isUserAdmin = data.is_user_admin;

        // Optionally, if the user is an admin, show the "Create event" button
        if (!isUserAdmin) {
          requestTabContainer.innerHTML += `
        <div id="member_request" class="request">
          <div class="request2and3_container">
            <p>Why do you want to join the club?</p>
            <textarea maxlength="400" placeholder="Write here" id="request_text"></textarea>
            <div class="inp_butt_container">
              <input type="file" id="file1" />
              <button id="request_join">Confirm</button>
            </div>
          </div>
        </div>
      `;
        } else {
          // Generate HTML for admin requests

          // Generate HTML for admin requests
          requests.forEach((request) => {
            const requestHTML = `
            <div class="member_request" data-user-id="${
              request.userId
            }" data-request-text="${request.request_text}" ${
              request.file
                ? `data-download-link="includes/download.php?request_id=${request.id}"`
                : ""
            }>
                <p class="member_name">${request.userName}</p>
                <button class="div_app">
                    application
                </button>
                <button class="div_acc">
                    accept
                </button>
                <button class="div_clo">
                   decline
                </button>
            </div>
        `;
            a += requestHTML;
          });

          a === "" ? (a = "no requests found") : a;

          var b =
            `<div id="request1" class="request">
            <div id="request1_container">` +
            a +
            `</div></div>`;

          requestTabContainer.innerHTML +=
            `
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
          
      ` +
            b +
            `
          <div id="request2" class="request">
            <div class="request2and3_container">
              <p>Why do you want to disable the club?</p>
              <textarea maxlength="400" placeholder="Write here" id="disable_txt"></textarea>
              <div class="inp_butt_container">
                <input type="file" id="disable_file" />
                <button id="disable_club">Confirm</button>
              </div>
            </div>
          </div>
          <div id="request3" class="request">
            <div class="request2and3_container">
              <p>Why do you want to delete the club?</p>
              <textarea id="delete_txt" maxlength="400" placeholder="Write here"></textarea>
              <div class="inp_butt_container">
                <input type="file" id="delete_file" />
                <button id="delete_club">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      `;
        }
        const requestTabs = document.querySelectorAll(".request_tab");
        const requests2 = document.querySelectorAll(".request");

        requestTabs.forEach(function (tab) {
          tab.addEventListener("click", function () {
            const clickedId = this.id.replace("request_tab", "request");

            // Hide all requests
            requests2.forEach(function (request) {
              request.style.display = "none";
            });

            // Show the clicked request
            document.getElementById(clickedId).style.display = "block";
            requestTabs.forEach(function (t) {
              t.style.backgroundColor = " var(--main-bg-color-3)";
            });

            // Highlight the clicked tab
            this.style.backgroundColor = "var(--main-bg-color-1)";
          });
        });

        const request_join = document.getElementById("request_join");
        if (request_join) {
          request_join.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default form submission
            const request_text = document.getElementById("request_text").value;
            const fileInput = document.getElementById("file1"); // Assuming your file input has an ID of 'file'
            const formData = new FormData();

            formData.append("request_text", request_text);

            // Check if a file is selected and append it to the FormData
            if (fileInput.files.length > 0) {
              const file = fileInput.files[0];
              formData.append("file", file);
            }

            // Perform the fetch request
            fetch("includes/createRequest.php", {
              method: "POST",
              body: formData,
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(
                    "Network response was not ok " + response.statusText
                  );
                }
                return response.json();
              })
              .then((data) => {
                if (data.success) {
                  // Handle successful request
                  console.log("Request submitted successfully:", data.message);
                  // You can also clear the form or show a success message to the user
                  document.getElementById("request_text").value = ""; // Clear text area
                  fileInput.value = ""; // Clear file input
                  alert(data.message); // Alert the user with the error message
                } else {
                  // Handle errors from the server
                  console.error("Error submitting request:", data.error);
                  alert(data.error); // Alert the user with the error message
                }
              })
              .catch((error) => {
                console.error("Fetch error:", error);
                alert(
                  "There was a problem with the request. Please try again."
                ); // Alert the user
              });
          });
        }
        const request_popup = document.getElementById("request_popup");
        const close_popup = document.getElementById("close_popup");
        const member_requests = document.querySelectorAll(".member_request");

        // Loop through each element and add an event listener
        member_requests.forEach((member) => {
          const ApplicationButton = member.querySelector(".div_app");
          const acceptButton = member.querySelector(".div_acc");
          const rejectButton = member.querySelector(".div_clo");

          // Function to handle showing the popup and setting the content
          const showPopup = () => {
            request_popup.style.display = "block"; // Show the popup

            const requestText = member.dataset.requestText;
            const downloadLink = member.dataset.downloadLink;

            // Set the text in the popup
            popup_request_text.textContent = requestText;

            // Check if there's a file to download and set the download link
            if (downloadLink) {
              popup_download_link.href = downloadLink;
              popup_download_link.style.display = "inline";
              popup_download_link.textContent = "Download File";
            } else {
              popup_download_link.style.display = "none";
              popup_download_link.textContent = "No file available";
            }
          };

          // Add event listeners for each button
          ApplicationButton.addEventListener("click", showPopup);
          acceptButton.addEventListener("click", (event) => {
            acceptUser(member.dataset.userId); // Handle user acceptance
          });
          rejectButton.addEventListener("click", (event) => {
            rejectUser(member.dataset.userId); // Handle user rejection
          });
        });

        // Close the popup when the close button is clicked
        close_popup.addEventListener("click", () => {
          request_popup.style.display = "none";
        });

        // Function to accept a user
        function acceptUser(userId) {
          fetch("includes/acceptUser.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "user_id=" + userId, // Send clubId along with userId
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                alert(data.message);
                // Optionally refresh the page or update the UI
              } else {
                alert(data.message);
              }
            })
            .catch((error) => console.error("Error:", error));
        }

        function rejectUser(userId) {
          fetch("includes/declineUser.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "user_id=" + userId, // Send clubId along with userId
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                alert(data.message);
                // Optionally refresh the page or update the UI
              } else {
                alert(data.message);
              }
            })
            .catch((error) => console.error("Error:", error));
        }
      })

      .catch((error) => console.error("Error fetching requests:", error));
  });
