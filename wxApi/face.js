/**
 * Created by Libing on 2019/9/5 18:15
 */
let express = require('express');
let http = require('http');
let request = require('request');
let qs = require('querystring');

let app = express();
const param = qs.stringify({
    'grant_type': 'client_credentials',
    'client_id': 'muKHXZMVR3gKRTeEgFSFrUGf',
    'client_secret': '3VnVV4f8rQFAdgmzu9QDZRtXtnQtwGgQ'
});
// const option ={
//     url:'https://aip.baidubce.com/oauth/2.0/token?'+param,
//     // hostname:'aip.baidubce.com',
//     // path:'/oauth/2.0/token?' + param,
//     methods:'GET',
//     agent:false
// };
//
// app.get('/token',(req,res)=>{
//     request(option,function (err,response,body) {
//         if(err){
//             console.log(err);
//             res.send({err_code: -1, err_msg: '服务器错误'});
//             return;
//         }else {
//             console.log(body)
//             res.send(body);
//         }
//     })
// });
//-----------------第二种方法---------------

const option ={
    // url:'https://aip.baidubce.com/oauth/2.0/token?'+param,
    hostname:'aip.baidubce.com',
    path:'/oauth/2.0/token?' + param,
    methods:'GET'
};

app.get('/token',(req,res)=>{
    var result = http.request(option,function (resss) {
        resss.on('data',function (chunk) {
            console.log("body"+chunk);
            res.json(JSON.parse(chunk.toString()));
        })
    });
    result.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    result.end(function (al) {
    });
});


app.listen('3001','127.0.0.1',function () {
    console.log("服务启动--->127.0.0.1:3001")
})

