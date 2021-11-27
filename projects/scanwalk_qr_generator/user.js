class User {
	p_userToken = "";
	p_tgToken = "";
	constructor() {
		if (this.p_storageAvailable() && localStorage.getItem('userToken') && localStorage.getItem('tgToken')) {
			this.p_userToken = localStorage.getItem('userToken');
			this.p_tgToken = localStorage.getItem('tgToken');
		}
	}
	p_storageAvailable() {
		try {
			const storage = window['localStorage'], x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);
			return true; // localStorage доступен
		}
		catch (e) { return false; } // localStorage не работает в этом браузере
	}
	isAccessible() {
		return ((this.p_userToken != "") && (this.p_tgToken != ""));
	}
	getUserToken() {
		return this.p_userToken;
	}
	getTgToken() {
		return this.p_tgToken;
	}
	setTokens(user, tg) {
		this.p_userToken = user;
		this.p_tgToken = tg;

		if (this.p_storageAvailable()) {
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

const user = new User();