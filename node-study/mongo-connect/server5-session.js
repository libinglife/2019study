/**
 * Created by Libing on 2019/4/17 11:24
 */
var express = require('express');
var app =express();
var session = require('express-session');

app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.get('/',function (req,res) {
    if(req.session.login == '1'){
        res.send('欢迎'+req.session.username)
    }else {
        res.send("没有成功登录")
    }
});

app.get("/login",function (req,res) {
   req.session.login =1;
   req.session.username = 'libing';
   res.send("你已成功登录"+req.session.username)
});

app.listen(3003,'127.0.0.1',function () {
    console.log("打开地址-----> 127.0.0.1:3003")
});


