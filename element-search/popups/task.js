let elem1 = document.getElementById('modal_success');
let elems = document.querySelectorAll('[href="#"]');
let modalClose = document.querySelectorAll('.modal__close.modal__close_times');

setTimeout(() => elem1.classList.add('modal_active'), 1000);

Array.from(elems).forEach(el => el.closest("a").onclick = () => moduleClose())

Array.from(modalClose).forEach(el => el.addEventListener("click", function () {

    this.closest('.modal').classList.remove('modal_active')
}))

function moduleClose() {
    let elements = document.querySelectorAll('.modal');
    for (let el of elements) {
        if (el.getAttribute('class') == 'modal modal_active') {
            el.classList.toggle('modal_active');
        } else {
            el.classList.toggle('modal_active');
        }
    }
}
