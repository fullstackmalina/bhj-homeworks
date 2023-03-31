const reader = document.querySelector('.book');

const controls = document.querySelector('.book__control');

let fontSize = document.querySelectorAll('.font-size');
let bookControlColor1 = document.querySelector('.book__control_color')
let bookControlBackground = document.querySelector('.book__control_background')
let textColor = bookControlColor1.querySelectorAll('.color')
let bgColor = bookControlBackground.querySelectorAll('.color')


// let bookControlColor = document.querySelectorAll('.color') // все элементы 
// console.log(bookControlColor)


Array.from(fontSize).forEach(el => el.addEventListener("click", function (event) {

    event.preventDefault();

    let arr = ['book_fs-big', 'book_fs-small', 'book_color-gray', 'book_color-whitesmoke', 'book_bg-gray', 'book_bg-white']


    console.log(event.target.previousElementSibling)
    if (event.target.dataset.size === 'big') {
        reader.classList.add('book_fs-big');
        reader.classList.remove('book_fs-small');
    } else if (event.target.dataset.size === 'small') {
        reader.classList.add('book_fs-small');
        reader.classList.remove('book_fs-big');
    } else {
        reader.classList.remove('book_fs-small');
        reader.classList.remove('book_fs-big');
    }

    Array.from(fontSize).forEach(el => el.classList.remove('font-size_active'))
    event.target.classList.add('font-size_active');

}))

Array.from(textColor).forEach(el => el.addEventListener("click", function (event) {
    event.preventDefault();

    console.log(event.target.previousElementSibling)

    if (event.target.dataset.textColor === 'gray') {
        reader.classList.add('book_color-gray');
        reader.classList.remove('book_color-whitesmoke');
    } else if (event.target.dataset.textColor === 'whitesmoke') {
        reader.classList.add('book_color-whitesmoke');
        reader.classList.remove('book_color-gray');
    } else {
        reader.classList.remove('book_color-gray');
        reader.classList.remove('book_color-whitesmoke');
    }

    Array.from(textColor).forEach(el => el.classList.remove('color_active'))
    event.target.classList.add('color_active');

}))

Array.from(bgColor).forEach(el => el.addEventListener("click", function (event) {
    event.preventDefault();

    // console.log(event.target.previousElementSibling)

    if (event.target.dataset.bgColor === 'black') {
        reader.classList.add('book_bg-white');
        reader.classList.remove('book_bg-gray');
    } else if (event.target.dataset.bgColor === 'gray') {
        reader.classList.add('book_bg-gray');
        reader.classList.remove('book_bg-white');
    } else {
        reader.classList.remove('book_bg-white');
        reader.classList.remove('book_bg-gray');
    }

    Array.from(textColor).forEach(el => el.classList.remove('color_active'))
    event.target.classList.add('color_active');

}))
