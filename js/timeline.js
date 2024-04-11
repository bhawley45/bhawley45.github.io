(function () {
  "use strict";

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
})();
