$(function () {
  $("#error").novacancy({
    reblinkProbability: 0.1,
    blinkMin: 0.2,
    blinkMax: 0.6,
    loopMin: 8,
    loopMax: 10,
    color: "#ffffff",
    glow: ["0 0 80px #ffffff", "0 0 30px #008000", "0 0 6px #0000ff"],
  });

  $("#code").novacancy({
    blink: 1,
    off: 1,
    color: "#e52d27",
    glow: ["0 0 80px #e52d27", "0 0 30px FireBrick", "0 0 6px DarkRed"],
  });
});
