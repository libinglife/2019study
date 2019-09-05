//main.js
var style =require('./css/style.css');
require('./css/style2.css')

import remInit from './pub/rem'
const greeter = require('./pub/greeter.js');

remInit()
document.querySelector("#root").appendChild(greeter());
console.log('哈哈哈')
// import cookie from './pub/cookie';
var a = '1245';
console.log(23,a)
// var cookie = require('./pub/cookie');
// console.log(cookie);
// cookie.setCookie("myName" ,"老铁");
// console.log(cookie.getCookie("myName"))

import {str , arr ,fun} from './pub/export';
import * as types from './pub/export';
// console.log(str)
// console.log(arr)
// console.log(fun())
// console.log(types)

