/**
 * Created by admin on 2018/6/26.
 */
// 设置cookie
function setCookie(name, value, duration) {
    // var Days = 30;
    if (!duration) {
        duration = 15;
    }
    var exp = new Date();
    exp.setTime(exp.getTime() + duration * 60 * 1000);
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString();
}

// 获取cookie
function getCookie(name) {
    var arr,
        reg = new RegExp("(^| )" + encodeURIComponent(name) + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)){
        return decodeURIComponent(arr[2]);
    } else{
        return null;
    }

}

// 删除cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

// export default {
//     setCookie,
//     getCookie,
//     delCookie
// }
module.exports={
  setCookie,
  getCookie,
  delCookie
};