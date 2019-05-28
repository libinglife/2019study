// Greeter.js
var text = require('./pub/config');
console.log(text);
module.exports = function() {
    var greet = document.createElement('div');
    greet.textContent = text.text;
    return greet;
};
