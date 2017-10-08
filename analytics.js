const uuidV4 = require('uuid/v4');

const ID = 'UA-107704260-1';

let clientId;

module.exports = {
    screen(name) {
        if (typeof clientId === 'undefined') {
            this.rehydrateClientID();
        }

        const base = `https://www.google-analytics.com/collect?tid=${ID}&v=1`;

        const tempId = (clientId) ? clientId : uuidV4();

        const params = [
            `cid=${tempId}`,
            'an=smartsheet-electron',
            'aid=smartsheet-electron',
            'av=1.0.0',
            't=screenview',
            'cd=' + encodeURIComponent(name),
        ];

        fetch(`${base}&${params.join('&')}`)
            .then((response, body) => {
                if (response && response.status === 200) {
                    console.log(response);
                    this.saveClientID(tempId);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },

    saveClientID(id) {
        localStorage.setItem('analyticsClientID', id);
        clientId = id;
    },

    rehydrateClientID() {
        if (localStorage.getItem('analyticsClientID')) {
            clientId = localStorage.getItem('analyticsClientID');
        } else {
            clientId = false;
        }
    },
};
