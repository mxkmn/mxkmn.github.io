const logging = true; // включение/выключение скорости получения

if (!user.isAccessible()) {
	alert("Необходимо войти ещё раз...");
	window.location.replace = "index.html";
}
else {
	getNewQr();
}
// document.getElementById('login_container').classList.remove("active");
//
//

function tgLogin() {
	alert("На данный момент бот недоступен");
}


function getNewQr() {
	const successDiv = document.getElementById('success');

	let xhr = new XMLHttpRequest();
	xhr.open('POST', "https://scanwalk.herokuapp.com/api/v1/qrecords/generate", true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

	xhr.onreadystatechange = function () {
		// console.log(xhr.responseText);
		const data = JSON.parse(xhr.responseText); // полученные данные
		const receiveDate = (new Date()).getTime(); // время получения данных
		// console.log("data:image/png;base64," + data["image"]);
		console.log(data["time"]);

		document.getElementById('qr_image').setAttribute("src", "data:image/png;base64," + data["image"]);

		if (logging) {
			successDiv.textContent = 'QR-код успешно сгенерирован за ' + (receiveDate - sendDate) + ' миллисекунд!';
			successDiv.setAttribute("style", "display: block");
		}
	}

	const sendDate = (new Date()).getTime();
	if (logging) {
		successDiv.setAttribute("style", "display: none");
	}
	xhr.send('{"token": "' + user.getToken() + '"}');
}