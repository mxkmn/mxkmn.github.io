setLastPage("login.html");

document.getElementById('loginForm').addEventListener('submit', submitForm);

function useResponse(data) {
	setUser(data["userId"]);
}