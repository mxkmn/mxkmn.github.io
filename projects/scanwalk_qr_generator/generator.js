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
	communications.getQr();
}
// document.getElementById('login_container').classList.remove("active");

function tgLogin() {
	window.open('https://t.me/HSEPassBot?start=' + user.getTgKey(), '_blank');
}


if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('pwa_sw.js')
		.then(() => { console.log('Service Worker Registered'); });
}

// хрень для иос
const isIos = () => {
	const userAgent = window.navigator.userAgent.toLowerCase();
	return /iphone|ipad|ipod/.test(userAgent);
}
// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// Checks if should display install popup notification:
if (isIos() && !isInStandaloneMode()) {
	this.setState({ showInstallMessage: true });
}