// ---------------------------time tracker---------------------
function startTimeTrackers() {
  let trackerElements = document.querySelectorAll(".time_tracker");

  trackerElements.forEach((element) => {
    let startTime = parseInt(element.getAttribute("data-start-time")) * 1000; // Convert seconds to milliseconds
    let startTimestamp = new Date().getTime() - startTime;

    function updateTracker() {
      let now = new Date().getTime();
      let elapsedTime = now - startTimestamp;

      let days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
      let hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
      let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
      let seconds = Math.floor((elapsedTime / 1000) % 60);

      element.innerHTML =
        (days < 10 ? "0" : "") +
        days +
        "d " +
        ":" +
        " " +
        (hours < 10 ? "0" : "") +
        hours +
        "h " +
        ":" +
        " " +
        (minutes < 10 ? "0" : "") +
        minutes +
        "m ";
      // (seconds < 10 ? "0" : "") + seconds + "s";
    }

    updateTracker(); // Run immediately
    setInterval(updateTracker, 1000); // Update every second
  });
}

// Start all time trackers
startTimeTrackers();

// ----------------------notifaction script---------------------------
document.addEventListener("DOMContentLoaded", function () {
  let bell = document.querySelector(".notification_bell");
  let notificationPanel = document.querySelector(".notification_cont");
  let notifications = document.querySelectorAll(".noti");

  // Toggle notification panel
  bell.addEventListener("click", function () {
    notificationPanel.style.display =
      notificationPanel.style.display === "block" ? "none" : "block";
  });

  // Mark notifications as read on click
  notifications.forEach((noti) => {
    noti.addEventListener("click", function () {
      if (noti.classList.contains("unread")) {
        noti.classList.remove("unread");
        noti.classList.add("read");
        noti.querySelector(".point").style.display = "none"; // Hide red dot
      }
    });
  });

  // Close the notification panel when clicking outside
  document.addEventListener("click", function (event) {
    if (!notificationPanel.contains(event.target) && !bell.contains(event.target)) {
      notificationPanel.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const noitAlerts = document.querySelectorAll(".noti_alert");

  // Retrieve count from localStorage
  const unreadCount = localStorage.getItem("unreadCount");

  // Update all notification alert elements
  noitAlerts.forEach((noitAlert) => {
    noitAlert.innerHTML = unreadCount > 0 ? unreadCount : "";
  });
});

// ----------------filter button-------------------------------------
const filterButtons = document.querySelectorAll(".filter_btn");
filterButtons.forEach((f_button) => {
  f_button.addEventListener("click", () => {
    document.querySelector(".filter_btn.active")?.classList.remove("active");
    f_button.classList.add("active");

    let status = button.getAttribute("data-status");
    document.querySelectorAll(".activity").forEach((activity) => {
      activity.style.display =
        status === "all" || activity.getAttribute("data-status") === status ? "block" : "none";
    });
  });
});
