let selectedButtonId = "no-audio-button-id";
let selectedBackgroundId = "blue-background-id";

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("#modal-id");
  const button = document.querySelector("#menu-button");
  const span = document.querySelector(".close-icon");

  button.addEventListener("click", function () {
    modal.style.display = "block";
    setButtonToActive(selectedButtonId);
    setBackgroundToActive(selectedBackgroundId);
  });

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});

let timeInSeconds = 300;
let interval;

function toggleTimer() {
  const playSvg = document.querySelector(".play-icon");
  const stopSvg = document.querySelector(".stop-icon");
  const circle = document.querySelector("#animation");

  if (document.querySelector(".invisible").classList.contains("stop-icon")) {
    playSvg.classList.add("invisible");
    stopSvg.classList.remove("invisible");
    circle.style.animation = `load ${timeInSeconds}s linear forwards`;

    document
      .querySelectorAll(".time-picker-button")
      .forEach((button) => (button.disabled = true));

    let target = new Date().valueOf() + timeInSeconds * 1000;
    interval = setInterval(() => timer(target, playSvg, stopSvg, circle), 100);
  } else {
    stopSvg.classList.add("invisible");
    playSvg.classList.remove("invisible");
    circle.style.animation = null;
    clearInterval(interval);
    document.querySelector("#timeDisplay").innerHTML = `${
      timeInSeconds / 60
    }:00`;

    document
      .querySelectorAll(".time-picker-button")
      .forEach((button) => (button.disabled = false));
  }
}

function timer(target, playSvg, stopSvg, circle) {
  let current = new Date().valueOf();

  let minutes = Math.floor((target - current) / 1000 / 60);
  let seconds = Math.floor((target - current) / 1000) % 60;

  if (seconds < 10 && seconds >= 0) {
    seconds = "0" + seconds;
  }
  if (seconds < 0) {
    seconds = "59";
  }

  if (minutes < 0) {
    stopSvg.classList.add("invisible");
    playSvg.classList.remove("invisible");
    circle.style.animation = null;
    document.querySelector("#timeDisplay").innerHTML = `${
      timeInSeconds / 60
    }:00`;
    document
      .querySelectorAll(".time-picker-button")
      .forEach((button) => (button.disabled = false));
    document.querySelector("#audio").play();
    clearInterval(interval);
  } else {
    document.querySelector("#timeDisplay").innerHTML = `${minutes}:${seconds}`;
  }
}

function setTimer(time) {
  timeInSeconds = time;

  document.querySelector("#timeDisplay").innerHTML = `${time / 60}:00`;
}

function stopAllAudios() {
  document.querySelectorAll("audio").forEach((audio) => audio.pause());
  const activeButton = document.querySelector(".active-menu-button");
  if (activeButton) {
    activeButton.classList.remove("active-menu-button");
  }
}

function setButtonToActive(buttonId) {
  selectedButtonId = buttonId;
  document.getElementById(selectedButtonId).classList.add("active-menu-button");
}

function playAudio(audio, buttonId) {
  selectedAudio = audio;
  document.getElementById(audio).play();
  setButtonToActive(buttonId);
}

function removeAllActiveBackgrounds() {
  const activeImage = document.querySelector(".active-background-image");
  if (activeImage) {
    activeImage.classList.remove("active-background-image");
  }
}

function setBackgroundToActive(backgroundId) {
  selectedBackgroundId = backgroundId;
  document.getElementById(selectedBackgroundId).classList.add("active-background-image");
}

function setBackgroundImage(url) {
  document.body.style.backgroundColor = "none";
  document.body.style = `background-image: url(${url}); background-repeat: no-repeat; background-size: 100vw 100vh;`;
}

function setBackgroundColor(color) {
  document.body.style = `background-image: none; background-repeat: none; background-size: none;`;
  document.body.style.backgroundColor = color;
}
