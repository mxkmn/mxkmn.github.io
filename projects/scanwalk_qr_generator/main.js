const url = "https://scanwalk.herokuapp.com/api/v1/qrecords/generate";

const user = new User();
if (!user.isAccessible()) {
	document.getElementById('login_container').classList.add("active");
}
else {
	getNewQr();
}
function randomize() {
	const id = Math.floor(Math.random()*5 + 100000); // Math.floor(Math.random() * (999999 - 100000) + 100000)
	const token = 'Bearer_eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJudWxsbnVtYmVyMSIsInJvbGVzIjpbXSwiaWF0IjoxNjM3MDgxMjk1LCJleHAiOjE2Njg2MzgyNDd9.IOZyTXwVghPv8se0WFhAgROpLuMYHZINtKVqIwE-auc';
	user.setData(id, token);
	getNewQr();
	document.getElementById('login_container').classList.remove("active");
}
function tgLogin() {
	alert("На данный момент бот недоступен");
}

const theme = new Theme();

function getNewQr() {
	const logging = false; // включение/выключение скорости получения
	let sendDate = 0;
	const successDiv = document.getElementById('success');

	let xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://mxkmn.github.io');
	xhr.setRequestHeader('Authorization', user.getToken())

	xhr.onreadystatechange = function () {
		document.getElementById('qr_image').setAttribute("src", "data:image/png;base64," + xhr.responseText);

		if (logging) {
			receiveDate = (new Date()).getTime();
			successDiv.textContent = 'QR-код успешно сгенерирован за ' + (receiveDate - sendDate) + ' миллисекунд!';
			successDiv.setAttribute("style", "display: block");
		}
	}

	if (logging) {
		sendDate = (new Date()).getTime();
		successDiv.setAttribute("style", "display: none");
	}
	xhr.send('{"id": ' + user.getId() + '}');
}