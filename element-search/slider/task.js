let sliderArrow = document.querySelectorAll('.slider__arrow');
let sliderItem = document.querySelectorAll('.slider__item');
let pointsArr = document.querySelectorAll('.slider__dot');

pointsArr[0].classList.add('slider__dot_active')

Array.from(sliderArrow).forEach(el => el.onclick = changeSlide);

Array.from(pointsArr).forEach((el, ind) => el.onclick = () => dotSlide(ind));

function changeSlide(event) {
    let classSlideArrow = event.target.classList;
    let slideInd = pointСhoice()

    if (classSlideArrow.contains('slider__arrow_next')) {
        if (slideInd == sliderItem.length - 1) {
            slideInd = 0;
        } else {
            slideInd++;
        }
    }

    if (classSlideArrow.contains('slider__arrow_prev')) {
        if (slideInd == 0) {
            slideInd = sliderItem.length - 1;
        } else {
            slideInd--;
        }
    }
    sliderItem[slideInd].classList.add('slider__item_active');

    pointsArr[slideInd].classList.add('slider__dot_active')
    pointsArr[slideInd - 1].classList.remove('slider__dot_active')

}

Array.from(pointsArr).forEach(el => el.addEventListener("click", function (event) {
    pointСhoice()
    event.target.classList.add('slider__dot_active')
    let pointInd = Array.from(pointsArr).findIndex(el => el.getAttribute("class") == event.target.getAttribute("class"))
    sliderItem[pointInd].classList.add('slider__item_active')
}))

function pointСhoice() {
    let slideInd = Array.from(sliderItem).findIndex(el => el.getAttribute("class") == "slider__item slider__item_active")

    if (Array.from(pointsArr).some(el => el.getAttribute("class") == "slider__dot slider__dot_active")) {
        pointsArr[slideInd].classList.toggle('slider__dot_active')
    }
    sliderItem[slideInd].classList.remove('slider__item_active');
    return slideInd
}
