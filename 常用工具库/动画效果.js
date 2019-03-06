/**
 * 流星滑动效果
 * @param className  滑动的元素
 * @param cycleTime   周期时间
 * @param opacityVal  透明度
 * @constructor
 */

    liuXingObj("liuxing1" , 1500 ,1);

    function liuXingObj(className ,cycleTime ,opacityVal) {
        var that =$('.'+className+'');
        var startX = that[0].offsetLeft+that[0].clientWidth+that[0].offsetTop ;
        var firstCycleTime =parseInt((that[0].offsetLeft+that[0].clientWidth)/startX*cycleTime);
        (function setLiuxing(time) {

            var clientWidth = $('.'+className+'')[0].clientWidth;
            var currentLeft =  $('.'+className+'')[0].offsetLeft;
            var currentTop = $('.'+className+'')[0].offsetTop;
            var xLength =currentLeft + clientWidth;
            var yLength =currentTop + xLength;
            $('.'+className+'').animate({
                left: -clientWidth + 'px',
                top: yLength + 'px',
                opacity: opacityVal
            }, time, 'linear', function () {
                var clientHeight = $(this)[0].clientHeight;
                $(this).css({
                    left: startX + 'px',
                    top: -clientHeight + 'PX',
                    opacity: 1
                });
                setLiuxing(cycleTime);
            });
        })(firstCycleTime);
    }



