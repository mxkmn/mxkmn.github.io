setLastPage("user_register.html");

document.getElementById('userRegisterForm').addEventListener('submit', submitData);

function submitData(event) {
	event.preventDefault(); // Отменяем стандартное поведение браузера с отправкой формы
	let formData = new FormData(event.target);

	let passes = {};
	formData.forEach((value, key) => {if (key == "pass" || key == "pass2") passes[key] = value; } );

	if (passes["pass"] == passes["pass2"]) submitForm(event);
	else alert("Введены разные пароли!");
}

function useResponse(data) {
	setUser(data["userName"]);
}