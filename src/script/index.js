function getCountdownType(minutes) {
  const timerText = getElement("timer");
  const pageTitle = getElement("page-title");
  const countdown = new Date(new Date().getTime() + minutes * 60000);

  workCountdown([countdown, timerText, pageTitle]);
}

function workCountdown([countdown, timerText, pageTitle]) {
  getTimerButtons();

  const actCountdown = setInterval(function () {
    // Calc timer
    const now = new Date().getTime();
    const distance = countdown - now;
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((distance % (1000 * 60)) / 1000);

    {
      // Parsing something like 5:0 to 05:00
      var x = secs.toString();
      var y = mins.toString();

      x.length === 1 ? (x = [...(x += 0)].reverse().join("")) : null;
      y.length === 1 ? (y = [...(y += 0)].reverse().join("")) : null;
    }

    // Printing the timer
    timerText.innerText = ` ${y}:${x} `;
    pageTitle.innerText = ` ${y}:${x} PomodoroTimer`;

    // Prevent timers at the same time
    btns.map((item) =>
      item.addEventListener("click", () => clearInterval(actCountdown))
    );

    // When timer finishes
    if (distance <= 0) {
      clearInterval(actCountdown);
      timerText.innerHTML = '<i class="fas fa-check"></i>';
      pageTitle.innerText = `00:00 ` + getPhrase();
      playFinishAlarm();
    }
  }, 1000);
}

const getTimerButtons = () => {
  return (btns = [
    window["time-big-pause"],
    window["time-pause"],
    window["time-pomodoro"],
  ]);
};

function getElement(element) {
  return window.document.querySelector(`.${element}`);
}

function playFinishAlarm() {
  window.document.querySelector("audio").play();
}

function getPhrase() {
  const phrases = [
    "DONE ✔",
    "Way to go!",
    "Congrats!",
    "FINISH!",
    "Play it again...",
    "You rock!",
  ];
  const sort = Math.floor(Math.random() * phrases.length);
  return phrases[sort];
}

(function () {
  console.log("Hello, world");
})();
