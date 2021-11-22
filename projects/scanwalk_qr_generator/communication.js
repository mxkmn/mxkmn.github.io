class Communication {
	#url = 'https://scanwalk.herokuapp.com/api/v1/qrecords/generate';
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
	getNewQr(token = user.getToken(), logging = false) {
        const successDiv = document.getElementById('success');
        const sendDate = (new Date()).getTime();
    
        if (logging) {
            successDiv.setAttribute("style", "display: none");
        }
    
        this.#postData(this.#url, { token: token })
            .then((data) => {
                document.getElementById('qr_image').setAttribute("src", "data:image/png;base64," + data["image"]);
        
                if (logging) {
                    successDiv.textContent = 'QR-код успешно сгенерирован за ' + (receiveDate - sendDate) + ' миллисекунд!';
                    successDiv.setAttribute("style", "display: block");
                }
            }
        );
    }
}

const communication = new Communication();