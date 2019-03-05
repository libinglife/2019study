
var cookie =require('./pub/cookie');

cookie.setCookie("myName","libing",2);
var value = cookie.getCookie("myName");
// console.log(value);
// cookie.delCookie("myName")
console.log(value);