/**
 * Created by Libing on 2019/4/17 11:50
 */

var express = require('express');
var app = express();
var db = require('./model/db.js');
var session = require('express-session');

app.use(session({
    secret:'keyboard cat',
    resave : false,
    saveUninitialized: true
}));

app.set('view engine','ejs');


app.get('/',function (req,res) {
    if(req.session.login=='1'){
        res.send("欢迎"+ req.session.username)
    }else {
        // res.send("没有成功登录");
        res.redirect('/login')
    }
});

app.get('/login',function (req,res) {
    res.render('login')
});

app.get("/checkLogin",function (req,res) {

    // console.log(req.query)
    var username = req.query.username;
    var password = req.query.password;

    //根据用户填写的姓名，去数据库找文档，读取密码
    //如果读取的密码，和填写 的密码一致，登录成功
    //如果读取的密码，和填写 的密码不一致，登录失败，请重新填密码
    //如果根本没找到这条数据，则说明用户名不存在，请确认填写用户是否正确
    // {"username" : "李兵" ,"password":"123456"}
    db.find('users',{"username":username},function (err,result) {
        console.log(result);
        if(result.length==0){
            res.send('你的登录名写错了，没有这个注册用户');
            return
        }

        var db_password = result[0].password;

        if(db_password == password){
            req.session.login = '1' ;
            req.session.username = result[0].username;
            res.send("成功登录 ， 你是"+ result[0].username)
        }else {
            res.send("密码错误！")
        }

    })
});


app.listen(3003,'127.0.0.1',function () {
    console.log("打开地址-----> 127.0.0.1:3003")
});


