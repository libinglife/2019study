//main.js
var style =require('../style.css');
require('../style2.css')

import remInit from './pub/rem'
const greeter = require('./Greeter.js');

remInit()
document.querySelector("#root").appendChild(greeter());

// import cookie from './pub/cookie';

// var cookie = require('./pub/cookie');
// console.log(cookie);
// cookie.setCookie("myName" ,"老铁");
// console.log(cookie.getCookie("myName"))

import {str , arr ,fun} from './pub/export';
import * as types from './pub/export';
console.log(str)
console.log(arr)
console.log(fun())
// console.log(types)
