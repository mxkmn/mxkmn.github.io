class User {
	p_token = "";
	p_tgKey = "";
	constructor() {
		if (this.p_storageAvailable() && localStorage.getItem('token') && localStorage.getItem('tgKey')) {
			this.p_token = localStorage.getItem('token');
			this.p_tgKey = localStorage.getItem('tgKey');
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
		return ((this.p_token != "") && (this.p_tgKey != ""));
	}
	getToken() {
		return this.p_token;
	}
	getTgKey() {
		return this.p_tgKey;
	}
	setData(user, tg) {
		this.p_token = user;
		this.p_tgKey = tg;

		if (this.p_storageAvailable()) {
			localStorage.setItem('token', user);
			localStorage.setItem('tgKey', tg);
		}
	}
	deauth() {
		this.setData("", "");
		document.getElementById('user_container').classList.remove("active");
		document.getElementById('login_container').classList.add("active");
	}
}

const user = new User();