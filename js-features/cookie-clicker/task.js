const counterClick = document.getElementById('clicker__counter');
const images = document.getElementById('cookie');
const clicker = document.querySelector('.clicker')
const clickerSpeed = `
      <div class="clicker__speed">
        Скорость клика: <span id="clicker__speed-counter">0</span>
      </div>
            `;
counterClick.insertAdjacentHTML("afterend", clickerSpeed);
const speedCounter = document.getElementById('clicker__speed-counter');
let counter = +counterClick.textContent;
let oldDate = Date.now();

images.onclick = () => {
    counterClick.textContent = `${++counter}`;
    speedCounter.textContent = (1000 / (Date.now() - oldDate)).toFixed(2);
    oldDate = Date.now();
    images.width = (counter % 2) ? 220 : 200;
}
