

let rotatorEll = document.querySelectorAll(".rotator__case")


setInterval(function () {

    const index = random(0, rotatorEll.length - 1);
    Array.from(rotatorEll).forEach(el =>
        el.classList.remove('rotator__case_active'));
    rotatorEll[index].classList.add('rotator__case_active');
}, 1000)


function random(min, max) {
    return min + Math.round(Math.random() * (max - min));
}