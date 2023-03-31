'use strict'

function convertTime(data) {
    const newData = data.split(':');
    return (+newData[0] * 3600 + +newData[1] * 60 + +newData[2]);
}

const timer = document.getElementById('timer');

//Часть 1
let startCounter = +timer.textContent;

const timerId = setInterval(() => {

    if (startCounter > 0) {
        startCounter--;
        timer.textContent = `${(startCounter < 10) ? '0' + startCounter : startCounter}`;
    } else {
        clearInterval(timerId);
        alert('Вы победили в конкурсе');
    }

}, 1000);