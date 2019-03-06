
function remInit (){
    window.onresize = r;
    function r(resizeNum) {
        //核心适配代码
        var winW = window.innerWidth;
        // document.getElementsByTagName("html")[0].style.fontSize = winW * 0.15625 + "px";
        document.getElementsByTagName("html")[0].style.fontSize = winW * 0.13333333333 + "px";
        //核心适配代码
        if (winW > window.screen.width && resizeNum <= 10) {
            setTimeout(function() {
                r(++resizeNum)
            }, 100);
        } else {
            document.getElementsByTagName("body")[0].style.opacity = 1;
        }
    }
    setTimeout(function() {
        r(0);
    }, 100);
}

export  default remInit