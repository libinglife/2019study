const EventEmitter = require('events').EventEmitter;
const event = new EventEmitter();
console.log("执行");
event.on('someEvent', num => {
    console.log("触发了:" + num);
});

let num = 0;
setInterval(() => {
    event.emit("someEvent", ++num);
}, 1000);