class User {
	#token = "";
	constructor() {
		if (this.#storageAvailable() && localStorage.getItem('userToken')) {
			this.#token = localStorage.getItem('userToken');
		}
	}
	#storageAvailable() {
		try {
			const storage = window['localStorage'], x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);
			return true; // localStorage доступен
		}
		catch (e) { return false; } // localStorage не работает в этом браузере
	}
	isAccessible() {
		return (this.#token != "");
	}
	getToken() {
		return this.#token;
	}
	setToken(token) {
		this.#token = token;

		if (this.#storageAvailable()) {
			localStorage.setItem('userToken', token);
		}
	}
	deauth() {
		this.setData("", "");
		document.getElementById('user_container').classList.remove("active");
		document.getElementById('login_container').classList.add("active");
	}
}

const user = new User();