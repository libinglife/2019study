/**
 * Created by Libing on 2019/3/29 17:12
 */
let express =  require('express');
let app = express();

let db =require('./model/db.js');
let formidable = require('formidable');
let ObjectId = require('mongodb').ObjectID;

//设置模板引擎
app.set('view engine' , "ejs") ;
//静态
app.use(express.static(require('path').join(__dirname,'./public')));

app.get('/',function (req ,res ,next) {
    db.getAllCount('liuyanben' ,function (count) {
        res.render('index',{
            "pageamount":Math.ceil(count/10)
        })
    })
});

//提交留言
app.post('/tijiao',function (req,res,next) {
    var form = new formidable.IncomingForm();
    form.parse(req,function (err,fields) {
        db.insertOne("liuyanben",{
            "name":fields.xingming,
            "liuyan" :fields.liuyan,
            "time" : new Date()
        },function (err,result) {
            if(err){
                res.send({"result":-1});
                return
            }
            res.json({"result":1})
        })
    })
});






app.listen(3002 , '127.0.0.1' ,()=>{
    console.log(`成功打开-----------127.0.0.1:3002`);
});