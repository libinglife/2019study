var R = 4; //半径
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;


var date = new Date();


var curShowTimeSeconds = 0; //秒数


window.onload = function() {


    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;





    setInterval(function() {
        curShowTimeSeconds = getCurrentTimeSeconds();
        render(context);
    }, 50)
}

function getCurrentTimeSeconds() {
    var curTime = new Date();
    var resTime = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
    console.log(resTime);
    return resTime;
}



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