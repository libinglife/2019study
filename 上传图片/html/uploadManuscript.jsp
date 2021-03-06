<!-- <%@ page contentType="text/html; charset=utf-8"%> -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>人人陪玩后台</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--<link rel="shortcut icon" type="image/x-icon" href="https://ssl.s.xnimg.cn/favicon-rr.ico?ver=3">-->
    <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
    <!--<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" >-->

    <link href="./css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
    <link  href="./css/cropper.css" rel="stylesheet">
    <link href="./css/common/tagsinput.css" rel="stylesheet" type="text/css"/>

    <!-- 引入样式 -->
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <%--<link rel="stylesheet" href="../../static/css/elm-icon.css">--%>
    <link rel="stylesheet" href="https://ssl.s.xnimg.cn/a96840/wap/mobile/a_VideoBack/css/uploadManuscript.css">
</head>
<body class="gray-bg">
<div class="wrapper wrapper-content">
    <div class="col-sm-12">
        <!--上传视频-->
        <div id="content"  >
            <p class="_p">
                <span>选择视频： </span>
                <!--文件选择按钮-->
                <a class="list" href="javascript:;">
                    <input id="file" type="file" name="myfile" onchange="UpladFile();" />
                    <span>上传稿件</span>
                </a>
                <!--上传速度显示-->
                <span class="tips">(仅限可播放的MP4文件)</span>
                <span id="time"></span>
            </p>
            <!--显示消失-->
            <ul class="el-upload-list el-upload-list--text" style="width: 85%; display:  none;">
                <li tabindex="0" class="el-upload-list__item is-success" >
                    <!--显示视频名字-->
                    <a class="el-upload-list__item-name">
                        <i class="el-icon-video-camera"></i><span id="videoName">视频名字</span>
                    </a>

                    <label class="el-upload-list__item-status-label" >
                        <i style="" class="el-icon-upload-success el-icon-circle-check" ></i>
                    </label>


                    <i class="el-icon-close" onclick="del();"></i>
                    <!--<i class="el-icon-close-tip"></i>-->
                </li>
            </ul>

            <!--进度条-->
            <div class="el-progress el-progress--line" style="display: none;">
                <div class="el-progress-bar" style="width: 80%;">
                    <div class="el-progress-bar__outer" style="height: 12px;">
                        <div class="el-progress-bar__inner" style="width: 0%;">
                        </div>
                    </div>
                </div>
                <div class="el-progress__text" style="font-size: 14.4px;">0%</div>
                <div class="delete__text"><i class="el-icon-delete" onclick="del();"></i></div>
            </div>
            <p class="_p"><span>上传视频</span>：<button class="btn btn-primary" type="button" onclick="sub();">上传</button></p>

        </div>
    </div>
</div>


<!--基本信息-->
<div class="wrapper wrapper-content ">
    <div class="row">
        <div class="col-sm-12">
            <div class="ibox float-e-margins">
                <div class="ibox-content">
                    <form class="form-horizontal m-t" id="signupForm">
                        <div class="form-group">
                            <label class="col-sm-3 control-label" style="font-size: 16px;">基本信息</label>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><label style="color: red;">*</label> 视频封面设置（不超过5M）：</label>
                            <div class="col-sm-8">
                                <div class="avatar-uploader">
                                    <div id="imgFile" tabindex="0" class= "el-upload el-upload--text">
                                        <label for="fileImg"> </label>
                                        <i class="el-icon-plus avatar-uploader-icon"></i>
                                        <input type="file"  onchange="" id="fileImg"  name="file" class="el-upload__input ">

                                        <div class="showImgBox" style="display: none">
                                            <img id="showResImg"  src="" alt="">
                                            <div class="markReselect">
                                                <label for="fileImg">
                                                    <i style="font-size: 22px;vertical-align: text-top;margin-top: -3px;" class="el-icon-upload"></i>
                                                    <span>更换封面</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label"><label style="color: red;">*</label> 分类：</label>
                            <div class="col-sm-8">
                                <select class="form-control" id="showPath" name="showPath" required>
                                    <option value="">-请选择-</option>
                                    <option value="1">娱乐</option>
                                    <option value="2">搞笑</option>
                                    <option value="3">美女</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><label style="color: red;">*</label> 标题：</label>
                            <div class="col-sm-8">
                                <input id="title" name="title" class="form-control" type="text" maxlength="40"
                                       placeholder="请输入标题" required
                                       onkeyup="this.value=this.value.replace(/\s+/g,'')"
                                       onBlur="this.value=this.value.replace(/\s+/g,'')">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label"><label style="color: red;">*</label> 标签：</label>
                            <div class="col-sm-8">
                                <input name="tagsinput" id="tagsinputval" class="form-control" data-role="tagsinput" value="" placeholder="输入后回车"/>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-4 control-label">推荐标签：</label>
                            <div style="display: flex;flex-direction: row;">
                                <div style="padding:6px;border-radius:12px;background:#1abc9c;color:#fff;text-align: center;margin-right:10px;">娱乐</div>
                                <div style="padding:6px;border-radius:12px;background:#1abc9c;color:#fff;text-align: center;margin-right:10px;">搞笑</div>
                                <div style="padding:6px;border-radius:12px;background:#1abc9c;color:#fff;text-align: center;margin-right:10px;">美女</div>
                                <div style="padding:6px;border-radius:12px;background:#1abc9c;color:#fff;text-align: center;margin-right:10px;">舞蹈</div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-sm-8 col-sm-offset-3">
                                <button type="button" onclick ="submitFile()"  class="btn btn-primary">提交稿件</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 870px;margin-top: 50px">
        <div class="modal-content" >
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">×
                </button>
                <h4 class="modal-title" id="myModalLabel">
                   封面裁切
                </h4>
            </div>

            <div class="modal-body">
                <!--裁切框-->
                <div class="caiQieLeft" >
                    <div class="box">
                        <img id="image" src="">
                    </div>
                    <p class="reelectFile">
                        <label for="fileImg">
                            <i class="el-icon-refresh"></i>
                            <span>重新选择</span>
                        </label>
                    </p>
                </div>

                <!--预览框-->
                <div class="smallImgBox"></div>
            </div>


            <div class="modal-footer">
                <button type="button" class="btn btn-default"
                        data-dismiss="modal">取消
                </button>

                <button type="button" onclick="imgFileUp()"  class="btn btn-primary">
                    确定
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->




<script src="https://ssl.s.xnimg.cn/a94371/wap/mobile/2017activity/listingPage/wap-page/js/jquery-3.2.1.min.js"></script>
<script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>

<script src="./js/tagsinput.js" type="text/javascript" charset="utf-8"></script>
<!--<script src="../../partnerStatic/js/date/bootstrap-datetimepicker.zh.js"></script>-->
<!--<script src="../static/cropper.js"></script>-->
<script src="./js/cropperXin.js"></script>
<!-- <script src="http://s.xnimg.cn/a96841/wap/mobile/a_VideoBack/js/uploadManuscript.js"></script> -->
<script src="./js/uploadManuscript.js"></script>

</body>
</html>