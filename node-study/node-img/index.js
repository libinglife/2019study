
var express = require('express');
var app = express();
var request = require('request');
app.get('/test', function (req, res) {
    // console.log(res);
    // res.json({
    //     code:'1',
    //     msg:'请求成功'
    // });
    var urlOld = 'http://huodong.renren.com/common/SurprisedWay/getStarRank?param=1&each=20';
    var urlXin = 'http://huodong.renren.com/common/ChildrenDayTinyAngelRefly/getHostRankAllStar';
    request(urlXin, {json: true}, (error, response, body) => {
        if (error) {
            console.log(error);
            res.send({err_code: -1, err_msg: '服务器错误'});
            return;
        }
        res.send(body);
    })
});

var server = app.listen(8091, 'lb.renren.com' , function () {

    var host = server.address().address;
    var port = server.address().port;

    // console.log("应用实例，访问地址为 http://%s:%s", host, port)
});



