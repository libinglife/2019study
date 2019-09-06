/**
 * Created by Libing on 2019/9/5 18:15
 */
let express = require('express');
let http = require('http');
let https = require('https');
let request = require('request');
let qs = require('querystring');
var fs = require('fs');

let multer = require('multer') ;
let bodyParse = require('body-parser');

let app = express();

let storage = multer.diskStorage({
    destination :function(req , file ,cb){
        cb (null , './public/uploads');
    },
    filename : function (req , file ,cb){
        console.log(file);

        // cb (null , `${Date.now()}-${file.originalname}`+'.png');
        cb (null , `${Date.now()}-${file.originalname}`);
        // console.log("------------");
    }
});

//添加配置文件到multer
let upload = multer ({
    storage : storage
});

app.use(bodyParse.urlencoded({extended:false}));
//把静态资源静态出去
app.use(express.static("public"));


//ai 参数
const param = qs.stringify({
    'grant_type': 'client_credentials',
    'client_id': 'muKHXZMVR3gKRTeEgFSFrUGf',
    'client_secret': '3VnVV4f8rQFAdgmzu9QDZRtXtnQtwGgQ'
});

//------------第一种方法---------------
const option ={
    url:'https://aip.baidubce.com/oauth/2.0/token?'+param,
    // hostname:'aip.baidubce.com',
    // path:'/oauth/2.0/token?' + param,
    methods:'GET',
    agent:false
};


//token获取
app.get('/token',(req,res)=>{
    request(option,function (err,response,body) {
        if(err){
            console.log(err);
            res.send({err_code: -1, err_msg: '服务器错误'});
            return;
        }else {
            console.log(body)
            res.send(body);
        }
    })
});
//-----------------第二种方法---------------

// const option ={
//     // url:'https://aip.baidubce.com/oauth/2.0/token?'+param,
//     hostname:'aip.baidubce.com',
//     path:'/oauth/2.0/token?' + param,
//     methods:'GET'
// };
//
// app.get('/token',(req,res)=>{
//     var result = http.request(option,function (resss) {
//         resss.on('data',function (chunk) {
//             console.log("body"+chunk);
//             res.json(JSON.parse(chunk.toString()));
//         })
//     });
//     result.on('error', function (e) {
//         console.log('problem with request: ' + e.message);
//     });
//     result.end(function (al) {
//     });
// });

//人脸识别接口


var token = "24.d06ac87a6e15ff3724e212ea3d3b665a.2592000.1570349719.282335-17178623";
var str ='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3570798179,2355932790&fm=26&gp=0.jpg';


app.post('/face',(req,res)=>{
   let options = {
       host: 'aip.baidubce.com',
       path: '/rest/2.0/face/v3/detect?access_token="'+token+'"',
       method: 'POST',
       headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
       }
   };

   let contents = JSON.stringify({
        image: str,
        image_type: "URL",
       "face_field":'age',
   });

   let req_baidu = https.request(options,function (res_baidu) {
       res_baidu.setEncoding('utf8');
       res_baidu.on('data',function (chunk) {
           res.send(chunk)
       })
   });
   req_baidu.write(contents);
   req_baidu.end();
});

app.listen('3001','127.0.0.1',function () {
    console.log("服务启动--->127.0.0.1:3001")
})

