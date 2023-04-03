const menu = document.querySelector('.dropdown');
const list = document.querySelector('.dropdown__list');
const link = document.querySelectorAll('.dropdown__link');
const value = document.querySelector('.dropdown__value');

menu.addEventListener('click', function (event) {
    let target = event.target;

    if (target.classList.contains('dropdown__value')) {
        list.classList.add('dropdown__list_active')
    }

    if (target.classList.contains('dropdown__link')) {
        value.textContent = target.textContent;
        list.classList.remove('dropdown__list_active')
    }

    event.preventDefault();
})