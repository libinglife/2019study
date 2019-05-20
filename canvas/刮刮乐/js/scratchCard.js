/**
 * Created by Libing on 2019/4/29 14:15
 */



//刮刮乐 面向对象写法
function Scratch(id) {
    this.game = document.getElementById(id);
    this.width = 300;
    this.height = 150;
    this.off = 0 ; //开关 0 ，1
    this.startX = 0 ;//起始X
    this.startY = 0 ;
    this.stage = this.game.getContext('2d');
    this.imgs = ['img/1.png','img/2.png','img/3.png','img/4.png','img/5.png','img/6.png'] ;
    // this.imgs =['http://fmn.rrimg.com/fmn072/20170418/1705/original_gCXx_91ec00117b911e83.png','http://fmn.rrimg.com/fmn072/20161226/1415/original_FCGU_c5fe00036f391e84.png','http://fmn.rrimg.com/fmn076/20160803/1450/original_UMyC_545a000645fb1e80.png','http://fmn.rrimg.com/fmn070/20160803/1445/original_vXbj_1ba30006da851e7f.png'] ; ;
    this.img = '';
    this.init();
}

Scratch.prototype = {
    init:function () {
      this.createImg();
      this.down();
      // this.move();
      this.up();
    },
    createImg: function () {
        this.img = this.imgs[this.randNum(this.imgs.length)];
        var pic = new Image();
        pic.src = this.img;
        var _this = this;
        pic.onload = function () {
            console.log(this);
            _this.game.width = this.width;
            _this.game.height = this.height;
            _this.game.style.background = 'url('+this.src+')';

            //填充灰色
            _this.stage.fillStyle = 'gray' ;
            _this.stage.fillRect(0,0,this.width,this.height);
            // _this.stage.fillRect(0,0,300,150);
            _this.stage.globalCompositeOperation = 'destination-out' ;
        }
    },
    
    down :function () {
        var _this = this;
        this.game.onmousedown = function (e) {
            _this.off = 1 ;
            _this.startX = this.offsetLeft;
            _this.startY = this.offsetTop ;
            //
            var x = e.clientX - _this.startX;
            var y = e.clientY - _this.startY;
            // 开启绘制圆形
            _this.stage.beginPath();
            _this.stage.fillStyle = 'rgba(0,0,0,0.9)';
            _this.stage.arc(x, y, 30, 0, 2*Math.PI);
            _this.stage.closePath();

            _this.stage.fill();
           // r= 20;
           // var timers = setInterval(function () {
           //      change(x,y,_this.stage,_this);
           //  },10)

            function change(x, y, context ,  _this ) {
                r++;
                console.log("哈哈哈");
                // context.clearRect(0,0, _this.width, _this.height);
                context.beginPath();
                context.fillStyle = 'rgba(0,0,0,0.9)';
                context.arc(x,y,r,0,2*Math.PI);
                context.closePath();
                context.fill();
                if(r>60){
                    clearInterval(timers)
                }
            }
        }    
    },

    up : function () {
      var _this = this ;

      this.game.onmouseup = function (e) {
          _this.off = 0;
      }
    },
    move: function () {
        var _this = this;
        _this.game.onmousemove = function (e) {
            if (!(_this.off)) return;

            var x = e.clientX - _this.startX;
            var y = e.clientY - _this.startY;
            //开启绘制圆形
            _this.stage.beginPath();
            _this.stage.fillStyle = 'rgba(0,0,0,0.9)';

            _this.stage.arc(x, y, 120, 0, 2*Math.PI);
            _this.stage.fill();

        };
    },

    guaKai :function (e) {
        var _this = this;



    },

    randNum :function (num) {
        return Math.floor(Math.random()*num);
    }
};

var st = new Scratch('game');
var st1 = new Scratch('game1');




