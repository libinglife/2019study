/*
 * @version: 
 * @Author: 李兵
 * @Date: 2019-04-20 18:58:10
 * @LastEditTime: 2020-04-16 11:48:12
 */
function remInit() {
    window.onresize = r;

    function r(resizeNum) {
        //核心适配代码
        var winW = window.innerWidth;

        // 假设设计稿750px  1rem=100px
        // 1rem = window.clientWidth/750*100
        // document.getElementsByTagName("html")[0].style.fontSize = winW * 0.15625 + "px";
        // document.getElementsByTagName("html")[0].style.fontSize = winW * 0.13333333333 + "px";
        document.getElementsByTagName("html")[0].style.fontSize = winW / 750 * 100 + "px";

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