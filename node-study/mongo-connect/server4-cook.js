/**
 * Created by Libing on 2019/4/3 14:56
 */
let express = require('express');
let cookieParser = require('cookie-parser');

let app = express();

//使用cookie 要使用cookie-parser 中间件
app.use(cookieParser());

app.get('/',function (req, res) {
    console.log("访问/")
    console.log(req.cookies);
    res.send("you like" + req.cookies.mudidi)
});

//查询一个地方的攻略，URL语法： http://127.0.0.1/gonglue?mididi=北京
//此时北京就能记录在cookie中

app.get('/gonglue',function (req,res) {
    console.log("访问/gonglue")
    var mudidi = req.query.mudidi;

    console.log(req.cookies);

    var mudidiArr = req.cookies.mudidi || [] ;

    if(mudidi){
        mudidiArr.push(mudidi);
    }


    res.cookie('mudidi',mudidiArr,{maxAge:900000 , httOnly:true})

    res.send(mudidi+"攻略")

});

app.listen(3003);






