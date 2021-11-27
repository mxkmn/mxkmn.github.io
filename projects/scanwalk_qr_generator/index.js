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



testLabel2.textContent = 'Скрипт 2 работает';
class Communications {
    async #postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return await response.json(); // parses JSON response into native JavaScript objects
    }
	getQr() {
        const url = "https://scanwalk.herokuapp.com/api/v1/qrecords/generate";
        
        const logging = false; // вывод скорости

        const successDiv = document.getElementById('success');
        const sendDate = (new Date()).getTime();
    
        if (logging) {
            successDiv.setAttribute("style", "display: none");
        }
    
        this.#postData(url, { token: user.getUserToken() })
            .then((data) => {
                document.getElementById('qr_image').setAttribute("src", "data:image/png;base64," + data["image"]);
        
                if (logging) {
                    successDiv.textContent = 'QR-код успешно сгенерирован за ' + (receiveDate - sendDate) + ' миллисекунд!';
                    successDiv.setAttribute("style", "display: block");
                }
            }
        );
    }
    getTokens() {
        const url = "https://scanwalk.herokuapp.com/api/v1/auth/token";

        testLabel2.textContent = 'Получение токена';
        this.#postData(url, { id: Math.floor(Math.random()*5 + 100000) }) // (Math.random() * (999999 - 100000) + 100000)
            .then((data) => {
                console.log(data);
                alert(data);
                testLabel2.textContent = 'Токен получен';
                user.setTokens(data["token"], data["tgtoken"]);
                window.location.replace("generator.html");
            }
        );
    }
}

testLabel2.textContent = 'Чё ваще происходит?';
const communications = new Communications();
testLabel2.textContent = 'Скрипт 3 закончен';



testLabel3.textContent = 'Скрипт 3 работает';
communications.getTokens();
testLabel3.textContent = 'Скрипт 3 закончен';