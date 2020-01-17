const http = require('http');
setInterval(async() => {

    try {
        const res = await http.get('http://localhost:3002');
        console.log("go");
    } catch (error) {
        // console.log(error);
    }

}, 2000)