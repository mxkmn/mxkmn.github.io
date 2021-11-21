class User {
	#id = "";
	#token = "";
	constructor() {
		if (this.#storageAvailable() && localStorage.getItem('userId') && localStorage.getItem('userToken')) {
			this.#id = localStorage.getItem('userId'); // устанавливаем id пользователя
			this.#token = localStorage.getItem('userToken'); // устанавливаем token пользователя (пользователя?)
			this.#setUserLabels();
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
	#setUserLabels() {
		document.getElementById('userLabel').textContent = "Вы вошли как " + this.#id;
	}
	isAccessible() {
		return (this.#id != "" && this.#token != "");
	}
	getId() {
		return this.#id;
	}
	getToken() {
		return this.#token;
	}
	setData(id, token) {
		this.#id = id;
		this.#token = token;
		this.#setUserLabels();

		if (this.#storageAvailable()) {
			localStorage.setItem('userId', id);
			localStorage.setItem('userToken', token);
		}
	}
	deauth() {
		this.setData("", "");
		document.getElementById('user_container').classList.remove("active");
		document.getElementById('login_container').classList.add("active");
	}
}