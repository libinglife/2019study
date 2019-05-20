/**
 * Created by Libing on 2019/4/23 16:19
 */

// ggl()
function ggl() {
    var game  = document.getElementById('game');
    console.log(game)
    var obj = game.getContext('2d');

    var imgs = [];

    for (var i =1 ;i<6;i++){
        imgs.push('img/'+i+'.png')
    }
    console.log(imgs);

    var img = imgs[Math.floor(Math.random()*imgs.length)];

    var pic = new Image();

    pic.src = img ;

    pic.onload = function () {
        game.width = this.width;
        game.height = this.height;
        game.style.background = 'url('+this.src+')';

        // 填充灰色
        obj.fillStyle = 'gray' ;
        obj.fillRect(0,0,this.width,this.height);

        //核心代码 让图层可以覆盖叠加
        // obj.globalCompositeOperation = "destination-out";

        // 声明鼠标按下
        var off = 0 ;
        var startX = 0;
        var startY = 0;

        game.onmousedown = function (e) {
            off = 1 ;
            startX = this.offsetLeft;
            startY = this.offsetTop;
        };

        game.onmouseup = function (e) {
            off = 0;
        };

        game.onmousemove = function (e) {
            if(!off) return;

            var x = e.clientX - startX;
            var y = e.clientY - startY;
            // 绘制个圆形
            obj.beginPath();
            obj.fillStyle = 'rgba(0,0,0,0.1)';
            obj.arc(x,y,20,0,2*Math.PI);
            obj.fill();
        }
    }
}



//刮刮乐 面向对象写法

function Scratch(id) {
    this.game = document.getElementById(id);
    this.width = '';
    this.height = '';
    this.off = 0 ; //开关 0 ，1
    this.startX = 0 ;//起始X
    this.startY = 0 ;
    this.stage = this.game.getContext('2d');
    this.imgs = ['img/1.png','img/2.png','img/3.png','img/4.png','img/5.png','img/6.png'] ;
    this.img = '';
    this.init();
}

Scratch.prototype = {
    init:function () {
      this.createImg();
      this.down();
      this.move();
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
            _this.stage.globalCompositeOperation = 'destination-out' ;
        }
    },
    
    down :function () {
        var _this = this;
        this.game.onmousedown = function (e) {
            _this.off = 1 ;
            _this.startX = this.offsetLeft;
            _this.startY = this.offsetTop ;
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
            _this.stage.fillStyle = 'rgba(0,0,0,0.3)';

            _this.stage.arc(x, y, 20, 0, 2*Math.PI);
            _this.stage.fill();

        };
    },
    randNum :function (num) {
        return Math.floor(Math.random()*num);
    }
};

var st = new Scratch('game');
var st1 = new Scratch('game1');
var st2 = new Scratch('game2');



