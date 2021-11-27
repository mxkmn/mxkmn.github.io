testLabel1.textContent = 'Скрипт 1 работает';
class User {
	#userToken = "";
	#tgToken = "";
	constructor() {
		if (this.#storageAvailable() && localStorage.getItem('userToken') && localStorage.getItem('tgToken')) {
			this.#userToken = localStorage.getItem('userToken');
			this.#tgToken = localStorage.getItem('tgToken');
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
		return ((this.#userToken != "") && (this.#tgToken != ""));
	}
	getUserToken() {
		return this.#userToken;
	}
	getTgToken() {
		return this.#tgToken;
	}
	setTokens(user, tg) {
		this.#userToken = user;
		this.#tgToken = tg;

		if (this.#storageAvailable()) {
			localStorage.setItem('userToken', user);
			localStorage.setItem('tgToken', tg);
		}
	}
	deauth() {
		this.setTokens("", "");
		document.getElementById('user_container').classList.remove("active");
		document.getElementById('login_container').classList.add("active");
	}
}

testLabel1.textContent = 'Чё ваще происходит?';
const user = new User();
testLabel1.textContent = 'Скрипт 1 закончен';