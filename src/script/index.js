app = (function () {
  const [btns, timers, timerText, pageTitle] = [
    [window["time-big-pause"], window["time-pause"], window["time-pomodoro"]],
    [10.01, 5.01, 25.01],
    document.querySelector(".timer"),
    document.querySelector(".page-title"),
  ];

  btns.map((btn, i) =>
    btn.addEventListener("click", () => getCountdownType(timers[i]))
  );

  function getCountdownType(minutes) {
    const countdown = new Date(new Date().getTime() + minutes * 60000);

    executeCountdown([countdown, timerText, pageTitle]);
  }

  function executeCountdown([countdown, timerText, pageTitle]) {
    const actCountdown = setInterval(function () {
      // Calculate timer
      const now = new Date().getTime();
      const distance = countdown - now;
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      {
        // Parsing something like 5:0 to 05:00
        var [secsStr, minsStr] = [seconds.toString(), minutes.toString()];

        minsStr.length === 1
          ? (minsStr = [...(minsStr += 0)].reverse().join(""))
          : null;
        secsStr.length === 1
          ? (secsStr = [...(secsStr += 0)].reverse().join(""))
          : null;
      }

      // Printing the timer
      timerText.innerText = ` ${minsStr}:${secsStr} `;
      pageTitle.innerText = ` ${minsStr}:${secsStr} PomodoroTimer `;
      timerText.style.animation = " timer-decrease 1s infinite";

      // Prevent timers at the same time
      btns.map((btn) =>
        btn.addEventListener("click", () => clearInterval(actCountdown))
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

  function playFinishAlarm() {
    document.querySelector("audio").play();
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
    const random = Math.floor(Math.random() * phrases.length);
    return phrases[random];
  }

  (function () {
    console.log("Hello, world");
  })();
})();
