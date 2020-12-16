function getCountdownType(minutes) {
  const btns = [
    window.document.querySelector("#time-pomodoro"),
    window.document.querySelector("#time-pause"),
    window.document.querySelector("#time-big-pause"),
  ];
  const countdown = new Date(new Date().getTime() + minutes * 60000);
  const timerText = window.document.getElementsByClassName("timer")[0];
  const pageTitle = window.document.getElementsByClassName("page-title")[0];

  const actCountdown = setInterval(function () {
    const now = new Date().getTime();

    const distance = countdown - now;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    timerText.innerText = ` ${minutes}:${seconds} `;
    pageTitle.innerText = ` ${minutes}:${seconds} PomodoroTimer`;
    btns.map((item) =>
      item.addEventListener("click", () => clearInterval(actCountdown))
    );
    console.log(typeof seconds)
    if (distance <= 0) {
      clearInterval(actCountdown);
      timerText.innerHTML = '<i class="fas fa-check"></i>';
      pageTitle.innerText = `PomodoroTimer`;

      playAudio();
    }
  }, 1000);
}

function playAudio() {
  window.document.querySelector("audio").play();
}
