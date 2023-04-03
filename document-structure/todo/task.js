'use strict'

const taskInput = document.querySelector('#task__input');
const addButton = document.querySelector('#tasks__add');
const taskList = document.querySelector('#tasks__list');

addButton.addEventListener('click', validateInput);
taskList.addEventListener('click', removeTask);

checkSaveLocalstorage();

function checkSaveLocalstorage() {
    const saveData = JSON.parse(localStorage.getItem('tasks'));
    if (saveData !== null && saveData.list.length > 0) {
        saveData.list.forEach(elem => {
            taskList.append(createTaskElement(elem));
        });
    } else {
        localStorage.setItem('tasks', JSON.stringify({ list: [] }));
    }
}

function validateInput(event) {
    event.preventDefault();
    const inputValue = taskInput.value.trim();
    if (inputValue.length === 0) {
        console.error('Пустое поле!');
        alert('Пустое поле');
        return;
    }
    addTask(inputValue);
}

function addTask(inputValue) {
    taskList.append(createTaskElement(inputValue))
    taskInput.value = '';
    addLocalStorage(inputValue);
}

function createTaskElement(taskValue) {
    let element = document.createElement('div');
    element.classList = 'task';
    console.log(element)
    element.innerHTML = `
          <div class="task__title">${taskValue}</div>
          <a href="#" class="task__remove">&times</a>
     `;
    console.log(element)
    return element;
}

function removeTask(event) {

    if (!event.target.matches('.task__remove')) return;

    const removeItem = event.target.closest('div.task');
    const index = [...taskList.children].indexOf(removeItem);

    removeItem.remove();
    removeLocalStorage(index);
}

function addLocalStorage(elem) {
    let storage = JSON.parse(localStorage.getItem('tasks'));
    storage.list.push(elem);
    localStorage.setItem('tasks', JSON.stringify(storage));
}

function removeLocalStorage(index) {
    let storage = JSON.parse(localStorage.getItem('tasks'));
    storage.list.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(storage));
}