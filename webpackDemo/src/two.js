// console.log("two.js");
const $ = require('./pub/jquery-1.11.3.min');
var definePro =require("./pub/defineProperty");


$("button").click(function () {
    $.ajax({
        type:'get',
        url:'/api/test',
        success:function (res) {
            console.log(res);
        },
        error:function (err) {
            console.log(err);
        }
    })
})