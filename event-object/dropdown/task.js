let menu = document.querySelector(".dropdown__value")
let dropdownMenu = document.querySelector(".dropdown__list")
console.log(menu)

menu.addEventListener("click", function () {
    dropdownMenu.classList.toggle("dropdown__list_active")
})

dropdownMenu.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        menu.innerHTML = event.target.innerHTML;
        dropdownMenu.classList.remove("dropdown__list_active");
        event.preventDefault();
    }
});

// set default value for dropdown
menu.innerHTML = "Select an option";

