(function () {
  "use strict";

  // Animations
  document.addEventListener("DOMContentLoaded", () => {
    let timelineAnimated = false; // Ensure the line animation only triggers once

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animation = "moveDown 1s linear forwards";
            if (!timelineAnimated) {
              document
                .querySelector(".timeline")
                .style.setProperty("--timeline-height", "100%");
              timelineAnimated = true;
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll(".timeline .container").forEach((container) => {
      observer.observe(container);
    });
  });

  // Drop-Down Text-box
  var collapseElementList = document.querySelectorAll(".timeline-collapse");

  collapseElementList.forEach(function (collapseEl) {
    var textBox = collapseEl.closest(".text-box"); // Get the parent .text-box for background color change
    var arrowId = textBox.querySelector("i").getAttribute("id"); // Get the arrow by finding the child <i> of textBox
    var arrow = document.getElementById(arrowId);

    collapseEl.addEventListener("show.bs.collapse", function () {
      arrow.classList.remove("fa-chevron-down");
      arrow.classList.add("fa-chevron-up");
      textBox.classList.add("active-background"); // Add the background color when open
      textBox.classList.remove("inactive-background");

      // Approach used due to CSS limitations switching to or from height:auto
      this.style.height = "auto";
      var autoHeight = this.clientHeight + "px"; // Capture auto height
      this.style.height = "0px";
      setTimeout(() => {
        this.style.height = autoHeight;
      }, 0);
    });

    collapseEl.addEventListener("hide.bs.collapse", function () {
      arrow.classList.remove("fa-chevron-up");
      arrow.classList.add("fa-chevron-down");
      textBox.classList.remove("active-background"); // Remove the background color when closed
      textBox.classList.add("inactive-background");
      this.style.height = "0px";
    });
  });
})();
