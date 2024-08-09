var pageData = {};

if (/Android|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
	document.body.style.fontSize = '170%';
	changeDisplayOfItems(".schedule");
	changeDisplayOfItems(".links");
	changeDisplayOfItems(".user");
}
else {
	document.querySelector(".links_burger").style.display = "none";

	const i1 = document.querySelectorAll(".schedule_burger");
	for (var i = 0; i < i1.length; i++) {
		i1[i].style.display = "none";
	}

	const i2 = document.querySelectorAll(".user_burger");
	for (var i = 0; i < i1.length; i++) {
		i2[i].style.display = "none";
	}
}

function changeDisplayOfItems(name) {
	const divs = document.querySelectorAll(name);
	for (var i = 0; i < divs.length; i++) {
		if (divs[i].style.display == "") divs[i].style.display = "none";
		else divs[i].style.display = "";
	}
}



if (storageAvailable('localStorage')) {
	if (localStorage.getItem('theme')) useStorage(); // если данные существуют
	else saveDefaultData(); // если их еще нет
}
else { // localStorage не работает в этом браузере
	document.getElementById("themeChanger").style.display = "none";
}

function saveDefaultData() {
	localStorage.setItem('theme', 'white');
	localStorage.setItem('scheduleJson', 'noInfo');
	localStorage.setItem('lastScheduleUpdate', 0);

	useStorage();
}
  
function useStorage() {
	setTheme(localStorage.getItem('theme'));
	setSchedule(localStorage.getItem('schedule'), localStorage.getItem('lastScheduleUpdate'))
}

function setUser(name) {
	if (storageAvailable('localStorage')) { // если localStorage работает в этом браузере
		// localStorage.setItem('userId', userId);
		localStorage.setItem('userName', name);
	}
}
function getUserName() {
	if (storageAvailable('localStorage')) { // если localStorage работает в этом браузере
		return (localStorage.getItem('userName'));
	}
}
// function getUserId() {
// 	if (storageAvailable('localStorage')) { // если localStorage работает в этом браузере
// 		return (localStorage.getItem('userId'));
// 	}
// }
// function deauth() {
// 	if (storageAvailable('localStorage')) { // если localStorage работает в этом браузере
// 		// localStorage.removeItem('userId');
// 		localStorage.removeItem('userName');
// 	}
// }

function setSchedule(c, b) {
	
}

function setLastPage(link) {
	if (storageAvailable('localStorage')) { // если localStorage работает в этом браузере
		localStorage.setItem('lastPage', link);
	}
}

function changeTheme() {
	color = localStorage.getItem('theme');
	if (color == 'white') color = 'dark';
	else color = 'white';

	localStorage.setItem('theme', color);
	setTheme(color);
}

function storageAvailable(type) {
	try {
		var storage = window[type], x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) { return false; }
}



function changeBurger(x, y) {
	changeDisplayOfItems(y);
	x.classList.toggle("change");
}

function setTheme(color) {
	if (color == 'white') {
		document.body.style.background = '#D7E1F2';
		document.body.style.color = 'black';

		document.getElementById('navbar').style.background = '#dde7f7';
		document.getElementById('aside_left').style.background = '#dde7f7';
		document.getElementById('aside_right').style.background = '#dde7f7';
		document.getElementById('aside_left_user').style.background = '#dde7f7';
		document.getElementById('aside_right_user').style.background = '#dde7f7';

		const first_conts = document.querySelectorAll(".first_cont");
		for (var i = 0; i < first_conts.length; i++) {
			first_conts[i].style.background = '#cbe0ff';
		}

		var links = document.getElementsByTagName("a");
		for (var i = 0; i<links.length; i++) {
			links[i].style.color = "black";
		}

		const conts = document.querySelectorAll(".cont");
		for (var i = 0; i < conts.length; i++) {
			conts[i].style.background = '#dde7f7';
		}
	}
	else if (color == 'dark') {
		document.body.style.background = '#121216';
		document.body.style.color = '#868F99';

		var links = document.getElementsByTagName("a");
		for (var i = 0; i<links.length; i++) {
			links[i].style.color = "#868F99";
		}

		document.getElementById('navbar').style.background = '#21262D';
		document.getElementById('aside_left').style.background = '#21262D';
		document.getElementById('aside_right').style.background = '#21262D';
		document.getElementById('aside_left_user').style.background = '#21262D';
		document.getElementById('aside_right_user').style.background = '#21262D';

		const bar1s = document.querySelectorAll(".bar1");
		for (var i = 0; i < bar1s.length; i++) {
			bar1s[i].style.background = '#777';
		}
		const bar2s = document.querySelectorAll(".bar2");
		for (var i = 0; i < bar2s.length; i++) {
			bar2s[i].style.background = '#777';
		}
		const bar3s = document.querySelectorAll(".bar3");
		for (var i = 0; i < bar3s.length; i++) {
			bar3s[i].style.background = '#777';
		}

		document.querySelector(".first_cont").style.background = '#2D3B4C';
		const conts = document.querySelectorAll(".cont");
		for (var i = 0; i < conts.length; i++) {
			conts[i].style.background = '#21262D';
		}
	}
}


const userName = getUserName();
if (userName != null) {
	const userInfos = document.querySelectorAll(".userInfo");
	for (var i = 0; i < userInfos.length; i++) {
		userInfos[i].textContent = 'Вы авторизованы как ' + userName;
	}
	const loginLinks = document.querySelectorAll(".loginLink");
	for (var i = 0; i < loginLinks.length; i++) {
		loginLinks[i].textContent = 'Выйти';
		loginLinks[i].href = 'deauth.html';
	}
}



function submitString(data) {
	// Собираем запрос к серверу
	let request = new Request("/main/projects/", {
		method: 'POST',
		body: data,
		headers: { 'Content-Type': 'application/json', },
	});

	console.log('JSON отправляется на сервер...');

	fetch(request).then( // Отправляем request (асинхронно!)
		function(response) { // request успешно отправлен, получен response, работаем с ним
			response.json().then(function(data) {
				useResponse(data);
			});
		}, function(error) { // если запрос не получилось отправить
			console.log(error);
		}
	);
}

function submitForm(event) {
	event.preventDefault(); // Отменяем стандартное поведение браузера с отправкой формы
	let formData = new FormData(event.target); // event.target — это HTML-элемент form

	// Собираем данные формы в объект
	let obj = {};
	formData.forEach((value, key) => obj[key] = value);
	obj["pageData"] = JSON.stringify(pageData);
	
	// Собираем запрос к серверу
	let request = new Request("/main/projects/", {
		method: 'POST',
		body: JSON.stringify(obj),
		headers: { 'Content-Type': 'application/json', },
	});

	console.log('JSON отправляется на сервер...');

	fetch(request).then( // Отправляем request (асинхронно!)
		function(response) { // request успешно отправлен, получен response, работаем с ним
			response.json().then(function(data) {
				useResponse(data);
			});
		}, function(error) { // если запрос не получилось отправить
			console.log(error);
		}
	);
}

// var jsonRequest = new XMLHttpRequest();
// jsonRequest.responseType = 'json';
// function tryGetData() {
// 	jsonRequest.open('GET', "https://raw.githubusercontent.com/mxkmn/mxkmn.github.io/master/projects/istu_po/example.json");
// 	jsonRequest.send();
// }
// jsonRequest.onreadystatechange = function() {
// 	if (jsonRequest.readyState === 4) { // if complete
// 		if (jsonRequest.status === 200) { // check if "OK" (200) - success
// 			data = jsonRequest.response;
// 			insertProjects(data);
// 		}
// 		else { // otherwise, some other code was returned
// 			alert("onready bad");
// 		}
// 	}
// }



// Register service worker to control making site work offline
if ('serviceWorker' in navigator) {
	navigator.serviceWorker
	.register('pwa_sw.js')
	.then(() => { console.log('Service Worker Registered'); });
}

// Code to handle install prompt on desktop
let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';
window.addEventListener('beforeinstallprompt', (e) => {
	e.preventDefault(); // Prevent Chrome 67 and earlier from automatically showing the prompt
	deferredPrompt = e; // Stash the event so it can be triggered later.
	addBtn.style.display = 'block'; // Update UI to notify the user they can add to home screen

	addBtn.addEventListener('click', () => {
		addBtn.style.display = 'none'; // hide our user interface that shows our A2HS button
		deferredPrompt.prompt(); // Show the prompt
		deferredPrompt.userChoice.then((choiceResult) => { // Wait for the user to respond to the prompt
			if (choiceResult.outcome === 'accepted') {
				console.log('User accepted the A2HS prompt');
			} else {
				console.log('User dismissed the A2HS prompt');
			}
			deferredPrompt = null;
		});
	});
});