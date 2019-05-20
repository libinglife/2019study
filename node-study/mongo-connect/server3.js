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


//渲染首页
app.get('/',function (req ,res ,next) {
    db.getAllCount('liuyanben' ,function (count) {
        res.render('index',{
            "pageamount":Math.ceil(count/5)
        });
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

//读取所有留言
app.get('/find',function (req,res,next) {

    var page = req.query.page;
    console.log(page);

    db.find('liuyanben',{},{"sort":{'time':-1},"pageamount":5,"page":page},function (err,result) {
        if(err){
            res.json({'msg':"获取数据失败","code":'-1'});
            throw err
        }else {
            res.json({'data':result,"code":1})
        }
    })
});

//删除某条留言
app.get('/delete' ,function (req,res,next) {
    var id = req.query.id;
    console.log(id)
    db.deleteMany('liuyanben',{"_id":ObjectId(id)},function (err,result) {
        if(err){
            res.json({"code":-1,'msg':'删除失败'})
            throw err
        }else {
            res.json({'code':1,'msg':"删除成功"})
            // res.redirect('/')
        }
    })
})

app.listen(8001 , '0.0.0.0' ,()=>{
    console.log(`成功打开-----------39.105.195.48:8001`);
});