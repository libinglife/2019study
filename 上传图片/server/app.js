"use strict";

let express = require('express');
let multer = require('multer') ;
let bodyParse = require('body-parser');

let app = express();

let storage = multer.diskStorage({
    destination :function(req , file ,cb){

        cb (null , './public/uploads')
    },
    filename : function (req , file ,cb){
          console.log(file)
        cb (null , `${Date.now()}-${file.originalname}`+'.png')
    }
})

//添加配置文件到multer
let upload = multer ({
    storage : storage
});

let imgBaseUrl ='../';

//bodyParse 用来解析post数据
app.use(bodyParse.urlencoded({
    extended :false
}));

app.use(express.static('public'));

//解决跨域问题

app.all('*' ,function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Content-type","text/html;charset=utf-8")
    // res.header("Content-type","image/jpeg")

    if(req.method == 'OPTIONS'){
        res.send(200);
    }else {
        next()
    }
});

console.log(upload);
//文件上传请求处理 ，upload.array 支持多文件上传，第二个参数是上传文件数目

app.post('/upload/img', upload.array('img', 2), function (req, res) {
// app.post('/upload/img', upload.single('fileid'), function (req, res) {
    console.log(req);
    //读取上传信息
    let files =req.files;

    //设置返回值
    let result ={};
    if(!files[0]){
        result.code =1 ;
        result.errMsg ="上传失败"
    }else{
        result.code =0 ;
        result.data ={
            url : files[0].path
        }
        result.msg ="上传成功"
    }

    res.end(JSON.stringify(result));

});


const server = app.listen(8088,'127.0.0.1',function () {
    console.log('listening at ==========> http://127.0.0.1:8088')
});
















