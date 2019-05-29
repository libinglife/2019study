var R = 18;

window.onload = function() {


    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 600;

    renderDigit(context, 10, 20, 1);
    renderDigit(context, 360, 20, 2);
}




// 绘制数字
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