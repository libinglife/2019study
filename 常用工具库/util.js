
/**
 * 生成随机字符串
 * @param randomFlag true表示返回的长度不固定 ，false 固定
 * @param minNum  //默认16
 * @param maxNum  //默认32
 */
function randomStr( minNum , randomFlag , maxNum   ) {
    var str = '' ;
    var minnum = minNum || 16; //默认16
    var maxnum = maxNum || 32; //默认32
    var range = minnum;
    var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a.text', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    //判断是否随机
    if(randomFlag) {
        range =Math.round(Math.random()*(maxnum-minnum))+minnum;
    }
    for (var i =0 ; i<range; i++){
        var index = Math.round(Math.random()*(arr.length-1));
        str += arr[index];
    }
    return str||"缺少参数哦"
}

/**
 * 生成时间戳
 * @param type //确定什么格式 天或秒
 * @returns {*}
 */
function timeFormat(type) {
    if (!type || type === 'day') { //天
        var date = new Date();
        var Y = date.getFullYear();
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y +"-"+ M +"-"+ D+" "+h+":"+ m +":"+ s;
    } else if (type === 'second') { //秒
        return parseInt(new Date().getTime() / 1000);
    } else {
        console.log('timeFormat flag 参数错误');
    }
}

