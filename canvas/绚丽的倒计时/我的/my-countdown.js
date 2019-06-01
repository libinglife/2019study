var R = 4; //半径
var MARGIN_TOP = 60;
var MARGIN_LEFT = 130;

var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;


// 当前的秒数
var curShowTimeSeconds = 0; //秒数

var balls = [];
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"];

var t =0 ;

window.onload = function() {


    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;




    curShowTimeSeconds = getCurrentTimeSeconds();

    setInterval(function() {

        render(context);
        update();
    }, 30);
    // update();
}

// 获取当前的时间
function getCurrentTimeSeconds() {
    var curTime = new Date();
    var resTime = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
    return resTime;
}



function update() {
    var nextShowTimeSeconds = getCurrentTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
    var nextSeconds = nextShowTimeSeconds % 60;

    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60)
    var curSeconds = curShowTimeSeconds % 60;


    // if(t==0){
    //     addBalls(MARGIN_LEFT + 93 * (R + 1), MARGIN_TOP, parseInt(2), nextSeconds);
    //     t++;
    // }


    // if (false) {
    if (nextSeconds != curSeconds) {


        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(nextHours / 10), nextSeconds);
        }
        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (R + 1), MARGIN_TOP, parseInt(nextHours % 10), nextSeconds);
        }

        if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (R + 1), MARGIN_TOP, parseInt(nextMinutes / 10), nextSeconds);
        }
        if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (R + 1), MARGIN_TOP, parseInt(nextMinutes % 10), nextSeconds);
        }

        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (R + 1), MARGIN_TOP, parseInt(nextSeconds / 10), nextSeconds);
        }
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {

            addBalls(MARGIN_LEFT + 93 * (R + 1), MARGIN_TOP, parseInt(nextSeconds % 10), nextSeconds);
            // addBalls(MARGIN_LEFT + 93 * (R + 1), MARGIN_TOP, parseInt(2), nextSeconds);
        }

        // addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(nextHours / 10));
        // addBalls(MARGIN_LEFT + 15 * (R + 1), MARGIN_TOP, parseInt(nextHours % 10));

        // addBalls(MARGIN_LEFT + 39 * (R + 1), MARGIN_TOP, parseInt(nextMinutes / 10));
        // addBalls(MARGIN_LEFT + 54 * (R + 1), MARGIN_TOP, parseInt(nextMinutes % 10));

        // addBalls(MARGIN_LEFT + 78 * (R + 1), MARGIN_TOP, parseInt(nextSeconds / 10));
        // addBalls(MARGIN_LEFT + 93 * (R + 1), MARGIN_TOP, parseInt(nextSeconds % 10));


        curShowTimeSeconds = nextShowTimeSeconds;

    }
    updateBalls(nextSeconds)
        // console.log(balls.length);
}



function updateBalls(theTime) {


    var length = balls.length-1;
    for (var i = 0; i < balls.length; i++) {

        balls[length-i].x += balls[length-i].vx;

        var c = 1.0; //摩擦阻力

        // if (balls[i].y + R + balls[i].vy >= WINDOW_HEIGHT) {
        //     // c = (WINDOW_HEIGHT - (balls[i].y + R)) / balls[i].vy;
        // }


        if (balls[length-i].y + R +balls[length-i].vy>= WINDOW_HEIGHT) {

            for (var j = 0; j < balls.length; j++) {
                if (balls[length-i].mTimes == balls[length-j].mTimes) {
                    // balls[i].y = balls[i].y;
                    // console.log(balls[i].y);
                    balls[length-j].vy = -(Math.abs(balls[length-j].vy) * 0.7);

                }
            }
            // balls[i].y = WINDOW_HEIGHT - R;
            // balls[i].vy = -Math.abs(balls[i].vy) * 0.75;
        }

        balls[length-i].y += (balls[length-i].vy);

        balls[length-i].vy += (balls[length-i].g * c);


    }

    var count = 0;
    for (var j = 0; j < balls.length; j++) {
        if (balls[j].x + R > 0 && balls[j].x - R < WINDOW_WIDTH) {
            balls[count++] = balls[j];
        }

        // if (balls[j].y - R < WINDOW_HEIGHT) {
        //     balls[count++] = balls[j];
        // }
    }
    while (balls.length > count) {
        balls.pop()
    }
}


// 添加小球
function addBalls(left, top, num, markTimes) {

    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: left + j * 2 * (R + 1) + (R + 1),
                    y: top + i * 2 * (R + 1) + (R + 1),
                    // g: 1.5 + Math.random(),
                    g: 1.5,
                    vx: -Math.pow(1, Math.ceil(Math.random() * 1000)) * 3,
                    vy: -15,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    mTimes: markTimes
                }

                balls.push(aBall)
            }
        }
    }
}

// 渲染函数
function render(cxt) {

    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    var hours = parseInt(curShowTimeSeconds / 3600);

    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    var seconds = curShowTimeSeconds % 60;


    // 绘制小时
    renderDigit(cxt, MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10));
    renderDigit(cxt, MARGIN_LEFT + 15 * (R + 1), MARGIN_TOP, parseInt(hours % 10));
    // 绘制冒号
    renderDigit(cxt, MARGIN_LEFT + 30 * (R + 1), MARGIN_TOP, 10);

    // 绘制分钟
    renderDigit(cxt, MARGIN_LEFT + 39 * (R + 1), MARGIN_TOP, parseInt(minutes / 10));
    renderDigit(cxt, MARGIN_LEFT + 54 * (R + 1), MARGIN_TOP, parseInt(minutes % 10));

    // 绘制冒号
    renderDigit(cxt, MARGIN_LEFT + 69 * (R + 1), MARGIN_TOP, 10);

    //绘制秒数
    renderDigit(cxt, MARGIN_LEFT + 78 * (R + 1), MARGIN_TOP, parseInt(seconds / 10));
    renderDigit(cxt, MARGIN_LEFT + 93 * (R + 1), MARGIN_TOP, parseInt(seconds % 10));


    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, R, 0, 2 * Math.PI);
        cxt.closePath();
        cxt.fill();
    }
}


// 绘制一个数字的封装
function renderDigit(cxt, left, top, num) {

    cxt.fillStyle = 'rgb(0,102,153)';
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(left + j * 2 * (R + 1) + (R + 1), top + i * 2 * (R + 1) + (R + 1), R, 0, 2 * Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }

}