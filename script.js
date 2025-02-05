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

document.addEventListener("DOMContentLoaded", () => {
  const noitAlerts = document.querySelectorAll(".noti_alert");

  // Retrieve count from localStorage
  const unreadCount = localStorage.getItem("unreadCount");

  // Update all notification alert elements
  noitAlerts.forEach((noitAlert) => {
    if (unreadCount > 0) {
      noitAlert.style.display = "flex";
      noitAlert.innerHTML = unreadCount;
    } else {
      noitAlert.style.display = "none";
    }
  });
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("noti")) {
    event.target.classList.remove("unread");
    handleCountUpdate();
  }
});

window.addEventListener("storage", (event) => {
  if (event.key === "unreadCount") {
    handleCountUpdate();
  }
});

// ----------------filter button-------------------------------------
document.querySelectorAll(".filter_btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter_btn.active")?.classList.remove("active");
    button.classList.add("active");

    let status = button.getAttribute("data-status");
    document.querySelectorAll(".activity").forEach((activity) => {
      activity.style.display =
        status === "all" || activity.getAttribute("data-status") === status ? "block" : "none";
    });
  });
});
