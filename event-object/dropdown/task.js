let menu = document.querySelector(".dropdown__value")
let dropdownMenu = document.querySelector(".dropdown__list")
console.log(menu)

menu.addEventListener("click", function () {
    dropdownMenu.classList.toggle("dropdown__list_active")
})

dropdownMenu.addEventListener("click", function (event) {
    menu.innerHTML = event.target.innerHTML
    event.preventDefault();
})