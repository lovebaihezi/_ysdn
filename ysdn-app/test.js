
const axios = require('axios');
(async () => {
    try {
        await axios({ url: 'localhost:8000/user/login', method: 'post' });
    } catch (e) {
        console.log(e);
    }
})();