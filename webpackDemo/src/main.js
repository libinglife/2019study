//main.js
var style =require('../style.css');
console.log(style)

const greeter = require('./Greeter.js');
document.querySelector("#root").appendChild(greeter());

// import cookie from './pub/cookie';

// var cookie = require('./pub/cookie');
// console.log(cookie);
// cookie.setCookie("myName" ,"老铁");
// console.log(cookie.getCookie("myName"))


import {str , arr ,fun} from './pub/export11';
import * as types from './pub/export11';
console.log(str)
console.log(arr)
console.log(fun())
// console.log(types)

