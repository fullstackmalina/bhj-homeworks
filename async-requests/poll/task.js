"use strict";

const pollTitle = document.querySelector("#poll__title");
console.log(pollTitle);
const pollAnswer = document.querySelector("#poll__answers");
console.log(pollAnswer);
const popup = document.querySelector("#popup");
console.log(popup);
const url = "https://netology-slow-rest.herokuapp.com/poll.php";
let id = null;    // id ответа
let title = null;   // Текст вопроса
let answers = null;    // Массив ответов

popup.addEventListener("click", popupHandler);

getData();


/**
 * Отправляет запрос на получение вопроса и ответов
 */
function getData() {
	let xhr = new XMLHttpRequest();
	console.log(xhr);
	console.log(xhr.readyState);
	xhr.addEventListener("readystatechange", dataHandler);
	xhr.open("GET", url);
	console.log(xhr.readyState);
	xhr.responseType = "json";
	xhr.send();
}


/**
 * Обрабатывает ответ и добавляет кнопки на страницу
 */
function dataHandler() {
	console.log(this.readyState);
	console.log(this.status);
	if (this.readyState === this.DONE && this.status === 200) {
		pollAnswer.addEventListener("click", answerHandler);
		id = this.response["id"];
		console.log(this);
		console.log(this.response);
		console.log(id);
		title = this.response.data["title"];
		console.log(title);
		answers = this.response.data["answers"];
		console.log(answers);

		let fragment = new DocumentFragment();
		console.log(fragment);

		answers.forEach(item => {
			fragment.append(createButton(item));
			console.log(fragment);
		});
		console.log(pollTitle);
		console.log(pollAnswer);
		pollTitle.append(title);
		pollAnswer.append(fragment);
	}
}

function createButton(text) {
	let button = document.createElement("button");
	console.log(button);
	button.className = "poll__answer";
	button.innerText = text;
	console.log(button);
	return button;
}

function answerHandler(event) {
	if (event.target.tagName !== "BUTTON") return;
	popup.classList.remove("hide-popup");
	console.log(popup.classList);
	const answerIndex = answers.indexOf(event.target.textContent);
	console.log(event.target.textContent);
	console.log(answerIndex);
	statsRequest(answerIndex);
}

function popupHandler(event) {
	if (event.target.tagName !== "BUTTON") return;
	popup.classList.add("hide-popup");
	console.log(popup.classList);
}

function statsRequest(answerIndex) {
	let xhrStats = new XMLHttpRequest();
	console.log(xhrStats);
	xhrStats.addEventListener("readystatechange", statsRequestHandler);
	xhrStats.open("POST", url);
	console.log(xhrStats.responseType);
	xhrStats.responseType = "json";
	xhrStats.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhrStats.send(`vote=${id}&answer=${answerIndex}`);
}

function statsRequestHandler() {
	if (this.readyState === this.DONE && this.status === 200) {
		const response = this.response["stat"];
		console.log(this);
		console.log(this.response);
		console.log(this.response["stat"]);
		let sum = response.reduce((sum, elem) => sum + elem["votes"], 0);
		console.log(sum);
		let fragment = new DocumentFragment();
		console.log(fragment);
		response.forEach(elem => {
			const { answer, votes } = elem;
			const percent = +(votes * 100 / sum).toFixed(2);
			console.log();
			fragment.append(createStatisticsElement(answer, percent));
		});

		// Очищаем элемент
		pollAnswer.innerHTML = "";
		console.log(pollAnswer);
		// Добавляем данные статистики
		pollAnswer.append(fragment);
		console.log(pollAnswer);
		// Добавяем кнопку перезагрузки страницы
		pollAnswer.insertAdjacentHTML("beforeEnd", "<button onclick=\"resetPage()\">C начала</button>");
		console.log(pollAnswer);
	}
}

function createStatisticsElement(answer, percent) {
	let element = document.createElement("p");
	console.log(element);
	element.innerHTML = `${answer}:&nbsp;<strong>${percent}&nbsp;%</strong>`;
	console.log(element);
	return element;
}


/**
     * Обновляет страницу
     */
function resetPage () {
	pollAnswer.removeEventListener("click", answerHandler);
	console.log(pollAnswer);
	// location.reload()
	pollTitle.innerHTML = "";
	console.log(pollTitle);
	pollAnswer.innerHTML = "";
	console.log(pollAnswer);
	getData();
}