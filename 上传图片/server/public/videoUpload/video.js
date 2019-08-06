/**
 * Created by Libing on 2019/7/3 16:14
 */

var xhr;//异步请求对象
var ot; //时间
var oloaded;//大小
//上传文件方法
function UpladFile() {
    var fileObj = document.getElementById("file").files[0]; // js 获取文件对象
    console.log(fileObj)
    if(fileObj.type == 'video/mp4'){
        if(fileObj.name){
            $(".el-upload-list").css("display","block");
            $(".el-upload-list li").css("border","1px solid #20a0ff");
            $("#videoName").text(fileObj.name);
        }else{
            alert("请选择文件");
        }
    }else {
        alert("请选择MP4文件");
    }


}
/*点击取消*/
function del(){
    $("#file").val('');
    $(".el-upload-list").css("display","none");
    $(".el-progress").css("display","none");
}
/*点击提交*/
function sub(){
    var fileObj = document.getElementById("file").files[0]; // js 获取文件对象
    if(fileObj==undefined||fileObj==""){
        alert("请选择文件");
        return false;
    }

    var url = "http://127.0.0.1:8088/upload/img"; // 接收上传文件的后台地址
    var form = new FormData(); // FormData 对象
    form.append("file", fileObj); // 文件对象

    $.ajax({
        url:url,
        type:'POST',
        data: form,
        processData: false,
        contentType : false,
        dataType : "json",
        success: uploadComplete,
        error: uploadFailed,
        beforeSend:function () {
                ot = new Date().getTime(); //设置上传开始时间
                oloaded = 0; //设置上传开始时，以上传的文件大小为0
        },
        xhr: function() {
            var xhr = new XMLHttpRequest();
            //使用XMLHttpRequest.upload监听上传过程，注册progress事件，打印回调函数中的event事件
            xhr.upload.addEventListener('progress', function (e) {
                console.log(e)
                progressFunction(e)

                // //loaded代表上传了多少
                // //total代表总数为多少

            });
            return xhr;
        }
    });
}

//上传进度实现方法，上传过程中会频繁调用该方法
function progressFunction(evt) {
    // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
    if(evt.lengthComputable) {
        $(".el-progress--line").css("display","block");
        /*进度条显示进度*/
        $(".el-progress-bar__inner").css("width", Math.round(evt.loaded / evt.total * 100) + "%");
        $(".el-progress__text").html(Math.round(evt.loaded / evt.total * 100)+"%");
    }

    //计算上传速度 和剩余时间
    var time = document.getElementById("time");
    var nt = new Date().getTime(); //获取当前时间
    console.log(nt);
    var pertime = (nt - ot) / 1000; //计算出上次调用该方法时到现在的时间差，单位为s
    console.log("pertime:"+pertime)
    ot = new Date().getTime(); //重新赋值时间，用于下次计算

    var perload = evt.loaded - oloaded; //计算该分段上传的文件大小，单位b
    oloaded = evt.loaded; //重新赋值已上传文件大小，用以下次计算

    //上传速度计算
    var speed = perload / pertime; //单位b/s
    var bspeed = speed;
    var units = 'b/s'; //单位名称
    if(speed / 1024 > 1) {
        speed = speed / 1024;
        units = 'k/s';
    }
    if(speed / 1024 > 1) {
        speed = speed / 1024;
        units = 'M/s';
    }
    speed = speed.toFixed(1);
    //剩余时间
    var resttime = ((evt.total - evt.loaded) / bspeed).toFixed(1);
    time.innerHTML = '上传速度：' + speed + units + ',剩余时间：' + resttime + 's';
    if(bspeed == 0){
        time.innerHTML = '上传已取消';
    }

}
//上传成功响应
function uploadComplete(evt) {
    //服务断接收完文件返回的结果  注意返回的字符串要去掉双引号
    console.log(evt)
    if(evt.code==0){
        var baseUrl = 'http://127.0.0.1:8088/'
        var str = baseUrl+evt.data.url.substr(7).replace(/\\/g,'/');

        // $(".preview").append("<video  controls='' autoplay='' name='media'><source src="+str+" type='video/mp4'></video>");
    }else{
        alert("上传失败");
    }
}
//上传失败
function uploadFailed(evt) {
    alert("上传失败！");
}


//------------------------------图片上传-----------------------------

var options = {
    aspectRatio: 16 / 9,
    preview: '.smallImgBox',
    viewMode:1,
    ready: function (e) {
        console.log(e.type);
    },
    cropstart: function (e) {
        console.log(e.type, e.detail.action);
    },
    cropmove: function (e) {
        console.log(e.type, e.detail.action);
    },
    cropend: function (e) {
        console.log(e.type, e.detail.action);
    },
    crop: function (e) {
    },
    zoom: function (e) {
        console.log(e.type, e.detail.ratio);
    }
};
var cropper ;//裁剪对象
var isAllow = false ;
$('#fileImg').change(function (ev) {

    var file = ev.target.files[0];
    var size = file.size;
    var maxSize = 5 *1024*1024 ; //转化为字节


    if(size>maxSize){//判断是否大于5M
        alert("最大为5M");
        return;
    }

    var img_reader = new FileReader();
    img_reader.readAsDataURL(file);
    img_reader.onload =function (e) {
        var img = new Image();
        img.src = e.target.result;
        img.onload=function () {
            var width = this.width;
            var height = this.height;
            console.log(width);
            console.log(height);
            if(width>1420||height>800){
                isAllow = false;
                alert("最大宽高为1420*800");
                return;
            }else if(width<710||height<400){
                isAllow = false;
                alert("最小宽高为710*400");
                return
            }
            console.log("执行")
            //执行
            doCropsImg (file)
        }
    };




});

//执行截图模态框
function doCropsImg (file) {
    var reader = new FileReader();
    var image = $('#image');
    image.attr('src', '');
    $('#myModal').modal("show") //模态框显示

    setTimeout(function () {
        reader.readAsDataURL(file);
        reader.onload =function (e) {
            $('#fileImg').val('') // 再次上传同一文件的时候, 又会触发onchange事件

            if(cropper){ //判断是否有创建对象
                cropper.destroy(); //销毁
            }
            var srcUrl = e.target.result;
            // console.log(srcUrl)
            image.attr('src', srcUrl);
            cropper = new Cropper(image[0], options);
        }
    },180)
}


//图片上传 确定按钮
function imgFileUp() {

    console.log(cropper)
    // var res = $('#image').cropper('getCroppedCanvas');
    var canvas = cropper.getCroppedCanvas();
    console.log(canvas)
    var caiQieUrl = canvas.toDataURL('image/jpeg');
    console.log(caiQieUrl);
    cropper.getCroppedCanvas().toBlob(function (blob) {
        console.log(blob)
        blob.originalname="李兵test";
        var formData = new FormData();
        formData.append('file', blob);
        $.ajax({
            url:'http://127.0.0.1:8088/upload/img',
            type:'POST',
            data: formData,
            processData: false,
            contentType : false,
            dataType : "json",
            success: function (data) {
                console.log(data);
                $('#myModal').modal('hide');
                $('#showResImg').attr('src',caiQieUrl);
                $('.showImgBox').show();
            },
            error: function () {
                console.log('Upload error');
            }
        })
    })
}
