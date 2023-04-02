class Game {
  constructor(container) {
    // Initialize class variables
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.TIME_LIMIT = document.querySelectorAll('.symbol').length;
    this.timeLeft = this.TIME_LIMIT;
    this.timePassed = 0;
    this.timerInterval = null;


    this.reset();


    this.registerEvents();
  }


  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }


  registerEvents() {
    document.addEventListener('keydown', event => {


      if (this.winsElement.textContent === '0' &&
        this.lossElement.textContent === '0' &&
        document.querySelectorAll('.symbol')[0].innerHTML === this.currentSymbol.textContent.toLowerCase()) {
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


  displayTimer() {
    document.getElementById('app').innerHTML = `
      <div class="base-timer">
        <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g class="base-timer__circle">
            <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
            <path id="base-timer-path-remaining" class="base-timer__path-remaining green" stroke-dasharray="283" d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "></path>
          </g>
        </svg>
        <span id="base-timer-label" class="base-timer__label">${this.formatTime(this.timeLeft)}</span>
      </div>
    `;
  }


  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timePassed += 1;
      this.timeLeft = this.TIME_LIMIT - this.timePassed;
      document.getElementById('base-timer-label').innerHTML = this.formatTime(this.timeLeft);
      this.setCircleDasharray();
      if (this.timeLeft === 0) {
        this.fail();
      }
    }, 1000);
  }


  formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds