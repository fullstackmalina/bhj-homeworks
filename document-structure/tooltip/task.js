'use strict'

function createTooltip(text, position) {
    let toolTip = document.createElement('div');
    toolTip.classList.add('tooltip', 'tooltip_active');
    toolTip.setAttribute('data-position', position);
    toolTip.innerText = text;
    console.log(toolTip)
    return toolTip;
}

let oldElem = null;

function deleteTooltip(elem) {

    const activeTooltip = document.querySelector('.tooltip_active');

    if (activeTooltip === null) {
        oldElem = elem;
        return true;
    }

    if (oldElem === elem) {
        activeTooltip.remove();
        return false;
    }

    oldElem = elem;
    activeTooltip.remove();
    return true;
}


const tooltips = document.getElementsByClassName('has-tooltip');

Array.from(tooltips).forEach(elem => {
    elem.addEventListener('click', showTooltip)
});

function showTooltip(event) {
    event.preventDefault();
    const messageTooltip = this.getAttribute('title');
    const coordinates = this.getBoundingClientRect()
    this.setAttribute('data-position', positionRandom())
    const tooltipPosition = this.dataset.position;

    let newTooltip = createTooltip(messageTooltip, tooltipPosition);

    if (newTooltip.dataset.position === 'bottom') {
        newTooltip.style.left = coordinates.left + 'px';
        newTooltip.style.top = coordinates.bottom + window.scrollY + 'px';

    } else if (newTooltip.dataset.position === 'right') {
        newTooltip.style.left = coordinates.right + 'px';
        newTooltip.style.top = coordinates.top + window.scrollY + 'px';

    } else if (newTooltip.dataset.position === 'left') {
        const positionX = document.body.clientWidth - coordinates.left;
        newTooltip.style.right = positionX + 'px';
        newTooltip.style.top = coordinates.top + window.scrollY + 'px';

    } else if (newTooltip.dataset.position === 'top') {
        const positionY = window.innerHeight - (coordinates.top + window.scrollY);
        newTooltip.style.left = coordinates.left + 'px';
        newTooltip.style.bottom = positionY + 'px';
    }

    if (deleteTooltip(this)) {
        this.insertAdjacentElement('afterEnd', newTooltip);
    }
}

function positionRandom() {
    let arr = ['top', 'left', 'right', 'bottom']
    let randomNamber = Math.floor(Math.random() * arr.length);
    return arr[randomNamber]
}