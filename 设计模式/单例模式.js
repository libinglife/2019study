/**
 * Created by Libing on 2019/8/30 16:48
 */
/*var CreateDiv = function (html) {
    this.html  = html;
    this.init();
};

CreateDiv.prototype.init = function () {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
};

var ProxySingletonCreateDiv = (function () {
   var instance = null ;
   return function (html) {
       if(!instance){
           instance = new CreateDiv(html)
       }
       return instance
   }
})();

var a = new ProxySingletonCreateDiv("seven1") ;
console.log(a);
var b = new ProxySingletonCreateDiv("seven2") ;
console.log(b);*/



//倒计时单例模式


function CounTimeDown(endTime,$obj,app,words) {
    this.el = $obj;
    this.endTime = endTime ;
    this.app = app;

    //开启倒计时
    this.mytime();
}
CounTimeDown.prototype.init = function () {
    var leftTime =  this.endTime--;

    //计算“天，时，分，秒”
    var d = parseInt(leftTime / 3600 / 24);
    var h = parseInt((leftTime / 3600) % 24);
    var m = parseInt((leftTime / 60) % 60);
    var s = parseInt(leftTime % 60);
    //补位
    h = h > 9 ? h : ("0" + h);
    m = m > 9 ? m : ("0" + m);
    s = s > 9 ? s : ("0" + s);
    //更新时间
    console.log( d + "天" + h + "小时" + m + "分" + s + "秒");
};

CounTimeDown.prototype.mytime = function () {
    var self = this ;
    this.timer =setInterval(function () {
        self.init();
        if(self.endTime<0){
            console.log("倒计时是结束");
            clearInterval(self.timer);
        }
    },1000)
};

var ProxyDownTime = (function () {
   var instance = null;
   return function (times) {
       if(!instance){
           instance = new CounTimeDown(times);
       }
       return instance

   }
})();

var a = new ProxyDownTime(40);
var b = new ProxyDownTime(50);
console.log(a);
console.log(b);