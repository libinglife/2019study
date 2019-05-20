/**
 * Created by Libing on 2019/4/17 18:36
 */

/**
 * 选项卡
 * @param id 选项卡id以参数的形式传入
 * @constructor
 */

function Tab(id) {
    var tabBox = document.getElementById(id);
    this.tabBtn = tabBox.getElementsByTagName('input');
    this.tabDiv = tabBox.getElementsByTagName('div');

    var _this = this;
    for (var i = 0 ;i<this.tabBtn.length;i++){
        this.tabBtn[i].index=i;

        this.tabBtn[i].onclick = function (ev) {
            var btn = this; //当前点击的btn
            _this.clickBtn(btn);
        };
    }
}

Tab.prototype = {
    clickBtn : function (btn) {

        console.log(this)
        for(var j=0;j <this.tabBtn.length;j++){
            this.tabBtn[j].className='';
            this.tabDiv[j].style.display = 'none';
        }
        btn.className ="active";
        this.tabDiv[btn.index].style.display = 'block';
    }
};


/**
 * 刮刮乐
 * @param id canvas id名
 * @param imgArr 图片数组
 * @constructor
 */

function Scratch(id ,imgArr) {
    this.game = document.getElementById(id);
    this.width = '';
    this.height = '';
    this.off = 0 ; //开关 0 ，1
    this.startX = 0 ;//起始X
    this.startY = 0 ;
    this.stage = this.game.getContext('2d');
    this.imgs = imgArr ;
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
            _this.stage.fillStyle = 'rgba(0,0,0,0.1)';

            _this.stage.arc(x, y, 20, 0, 2*Math.PI);
            _this.stage.fill();

        };
    },
    randNum :function (num) {
        return Math.floor(Math.random()*num);
    }
};

