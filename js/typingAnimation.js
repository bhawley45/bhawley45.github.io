const typingSound = new Audio("./sounds/sfx_typing.wav"); // Path to your typing sound
const typingElements = document.querySelectorAll(".typing-text"); // All elements to animate with typing

// Function to check if sound is enabled
function canPlaySound() {
  return localStorage.getItem("soundEnabled") === "true";
}

// Function to play sound safely, checking preference first
function safePlaySound(sound) {
  if (canPlaySound()) {
    sound.play().catch((error) => console.error("Error playing sound:", error));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Typing animation
  typingElements.forEach((element, index) => {
    // Delay the start of each typing animation
    setTimeout(() => {
      element.classList.add("typing");
      // console.log(element);
      safePlaySound(typingSound);
    }, index * 225); // Adjust timing for each index of typing-text found
  });
});
