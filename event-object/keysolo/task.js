

class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');

    this.reset();

    this.TIME_LIMIT = document.querySelectorAll('.symbol').length
    this.timeLeft = this.TIME_LIMIT
    this.timePassed = 0;
    this.timerInterval = null;
    this.formsTimer();

    this.registerEvents();

  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  async registerEvents() {

    document.addEventListener('keydown', event => {
      if (this.winsElement.textContent == 0 && this.lossElement.textContent == 0 && document.querySelectorAll('.symbol')[0].innerHTML == this.currentSymbol.textContent.toLowerCase()) {
        this.startTimer();
      }
      const eventLetter = event.key.toLowerCase().charCodeAt(0);
      const screenLetter = this.currentSymbol.textContent.toLowerCase().charCodeAt(0);
      if (screenLetter === eventLetter) {
        this.success();
      } else {
        this.fail();
      }
    });
  }

  formsTimer() {
    document.getElementById("app").innerHTML = `
    <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
          id="base-timer-path-remaining"
          stroke-dasharray="283"
          class="base-timer__path-remaining green"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        ></path>
      </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">${this.formatTime(
      this.timeLeft
    )}</span>
  </div>
`;
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timePassed = this.timePassed += 1;
      this.timeLeft = this.TIME_LIMIT - this.timePassed;

      document.getElementById("base-timer-label").innerHTML = this.formatTime(this.timeLeft);
      this.setCircleDasharray();

      if (this.timeLeft === 0) {
        this.fail()
      }
    }, 1000);
  }

  formatTime(time) {
    const minutes = Math.floor(time / 60);

    let seconds = time % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }

  onTimesUp() {
    clearInterval(this.timerInterval);
  }

  calculateTimeFraction() {
    const rawTimeFraction = this.timeLeft / this.TIME_LIMIT;
    return rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction);
  }

  setCircleDasharray() {
    const circleDasharray = `${(this.calculateTimeFraction() * 283).toFixed(0)} 283`;
    document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);
  }

  subsequentStartTimerFunctions() {

    this.TIME_LIMIT = document.querySelectorAll('.symbol').length
    this.timeLeft = this.TIME_LIMIT;
    this.timePassed = 0;
    this.timerInterval = null;
    this.formsTimer();
    this.onTimesUp();
    this.startTimer()
  }

  success() {
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;
    if (this.currentSymbol !== null) {
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.onTimesUp();
    this.subsequentStartTimerFunctions()

    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.onTimesUp();
    this.subsequentStartTimerFunctions()

    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
  }

  getWord() {
    const words = [
      'bob',
      'awesome',
      'netology',
      'hello',
      'kitty',
      'rock',
      'youtube',
      'popcorn',
      'cinema',
      'love',
      'javascript'
    ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current' : ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))