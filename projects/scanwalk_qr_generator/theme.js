class Theme {
	#id = 0;
	constructor() {
		if (this.#storageAvailable() && localStorage.getItem('theme')) {
			this.#id = parseInt(localStorage.getItem('theme'), 10); // устанавливаем тип темы
            this.#setTheme();
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
	#setTheme() {
        if (this.#id == 0) {
	        document.querySelector('.colorizable').classList.remove("black");
        }
        else if (this.#id == 1) {
	        document.querySelector('.colorizable').classList.add("black");
        }
    }
	changeTheme() {
		this.#id = (this.#id + 1) % 2;
        this.#setTheme();

		if (this.#storageAvailable()) {
			localStorage.setItem('theme', this.#id);
		}
	}
}