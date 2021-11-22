const form = document.querySelector('.form-container');
document.querySelector('.user-active').addEventListener("click", function (e) { // кнопка "пользователь"
	document.getElementById('user_container').classList.add("active");
});
document.querySelector('.user-close').addEventListener("click", function (e) { // крестик в форме пользователя
	document.getElementById('user_container').classList.remove("active");
});



if (!user.isAccessible()) {
	alert("Необходимо войти ещё раз...");
	window.location.replace("index.html");
}
else {
	communication.getNewQr();
}
// document.getElementById('login_container').classList.remove("active");

function tgLogin() {
	alert("На данный момент бот недоступен");
}


if ('serviceWorker' in navigator) {
	navigator.serviceWorker
	.register('pwa_sw.js')
	.then(() => { console.log('Service Worker Registered'); });
}