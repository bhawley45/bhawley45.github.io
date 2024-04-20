const typingSound = new Audio("./sounds/sfx_typing.wav"); // Path to your typing sound
const typingElements = document.querySelectorAll(".typing-text"); // All elements to animate with typing

document.addEventListener("DOMContentLoaded", () => {
  // Typing animation
  typingElements.forEach((element, index) => {
    // Delay the start of each typing animation
    setTimeout(() => {
      element.classList.add("typing");
      // console.log(element);
      typingSound.play();
    }, index * 225); // Adjust timing for each index of typing-text found
  });
});
