
var style3 =require('../style3.css');
console.log(style3)
var cookie =require('./pub/cookie');

cookie.setCookie("myName","libing",2);
var value = cookie.getCookie("myName");
// console.log(value);
// cookie.delCookie("myName")
console.log(value);

// var pro =require('./process');
import pro from  './process'
console.log(pro)
console.log(pro.test())
console.log(pro.str)
console.log(pro.arr)
