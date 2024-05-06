// Sound settings and modal controls
function closeModal() {
  const soundModal = document.getElementById("sound-pref-modal");
  soundModal.style.display = "none";
  // Immediately set 'modalShown' to prevent the modal from appearing again.
  localStorage.setItem("modalShown", "true");
}

// This function checks and shows the modal if it hasn't been shown before.
function checkAndShowModal() {
  if (localStorage.getItem("modalShown") !== "true") {
    const modal = document.getElementById("sound-pref-modal");
    modal.style.display = "block";
  } else {
    console.log("Modal has been shown before; not displaying it.");
  }
}

// Initialize the page and components
document.addEventListener("DOMContentLoaded", () => {
  // Check and potentially show the sound preference modal
  checkAndShowModal();

  // Attempt to play silent audio to determine browser policy on autoplay
  const testAudio = new Audio("./sounds/sfx_silent.wav");
  testAudio
    .play()
    .then(() => {
      console.log("Audio can be played");
      localStorage.setItem("soundEnabled", "true");
    })
    .catch((error) => {
      console.error("Audio playback prevented", error);
      localStorage.setItem("soundEnabled", "false");
    });
});
