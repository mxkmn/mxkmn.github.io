class Theme {
	p_id = 0;
	constructor() {
		if (this.p_storageAvailable() && localStorage.getItem('theme')) {
			this.p_id = parseInt(localStorage.getItem('theme'), 10); // устанавливаем тип темы
            this.p_setTheme();
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
	p_setTheme() {
        if (this.p_id == 0) {
	        document.querySelector('.colorizable').classList.remove("black");
        }
        else if (this.p_id == 1) {
	        document.querySelector('.colorizable').classList.add("black");
        }
    }
	changeTheme() {
		this.p_id = (this.p_id + 1) % 2;
        this.p_setTheme();

		if (this.p_storageAvailable()) {
			localStorage.setItem('theme', this.p_id);
		}
	}
}

const theme = new Theme();