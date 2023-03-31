

const tabs = document.querySelectorAll('.tab');
const contentList = document.querySelectorAll('.tab__content');

tabs.forEach(el => el.addEventListener('click', change));

function change(event) {

    tabs.forEach(el => el.className = 'tab');
    event.target.classList.add('tab_active');
    contentList.forEach(el => el.className = 'tab__content');
    const index = Array.from(tabs).indexOf(event.target);
    contentList[index].classList.add('tab__content_active');

}