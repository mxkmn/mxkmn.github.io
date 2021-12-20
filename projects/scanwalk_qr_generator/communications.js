class Communications {
    p_timeout = null;
    async p_postData(url = '', data = {}) {
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
        }).catch((error) => {
            clearTimeout(this.p_timeout);
            activate('connection_error');
            this.p_timeout = setTimeout(update, 10*1000);
        })
        return await response.json(); // parses JSON response into native JavaScript objects
    }
	getQr() {
        const url = "https://scanwalk2.herokuapp.com/api/v1/qrecords/generate";

        const successDiv = document.getElementById('success');
    
        this.p_postData(url, { token: user.getToken() })
            .then((data) => {
                console.log(data);
                clearTimeout(this.p_timeout);
                document.getElementById('qr_image').setAttribute("src", "data:image/png;base64," + data["image"]);
                activate('qr_image');
                this.p_timeout = setTimeout(update, (data["time"]-3)*1000);
            }).catch((error) => {
                
                clearTimeout(this.p_timeout);
                activate('timeout');
                this.p_timeout = setTimeout(update, 5*1000);
        });
    }
    getTokens() {
        const url = "https://scanwalk2.herokuapp.com/api/v1/auth/token";

        this.p_postData(url, { id: Math.floor(Math.random()*5 + 100000) }) // (Math.random() * (999999 - 100000) + 100000)
            .then((data) => {
                user.setData(data["token"], data["tgtoken"]);
                window.location.replace("generator.html");
            });
    }
}

const communications = new Communications();