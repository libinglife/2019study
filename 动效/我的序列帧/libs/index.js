

play_animation();
function play_animation() {
    var body = document.getElementsByTagName("body");
    console.log(body[0].offsetWidth);

    var canvas = document.getElementById('testCanvas');

    var canvasWidth = body[0].offsetWidth ;

    let framesUrl = [] ;
    for(let i = 1; i<8;i++){
        framesUrl.push('images/2018年度盛典标题动效000' + i + '.png')
        // framesUrl.push('img/frame-' + i + '.gif')
    }

    let ani = new frame_ani({
        canvasTargetId: "testCanvas", // target canvas ID
        framesUrl: framesUrl, // frames url
        loop: true, // if loop
        // width:  750 , // source image's width (px)
        width:  750 , // source image's width (px)
        height: 640, // source image's height (px)
        frequency: 15, // count of frames in one second
        onComplete: function () { // complete callback
            console.log("完成");
        },
    });
    ani.initialize(() => {
        ani.play();
    });
}