/**
 * Created by Libing on 2019/5/24 14:52
 */

//封装工具库 对象名 lbDo

var lbDo = {

    /**
     * 到某一时刻的倒计时
     * getEndTime('2017/7/22 16:0:0')
     * @param endTime
     */
    getEndTime (endTime) {
        let startDate = new Date(); // 当前时间
        let endDate = new Date(endTime); //结束时间
        let leftTime =  endDate.getTime() - startDate.getTime();//时间差的毫秒数

        let d = 0,
            h = 0,
            m = 0,
            s = 0;
        if (leftTime >= 0) {
            d = Math.floor(leftTime / 1000 / 3600 / 24);
            h = Math.floor(leftTime / 1000 / 3600 % 24);
            m = Math.floor(leftTime / 1000 / 60 % 60);
            s = Math.floor(leftTime / 1000 % 60);

            h = h > 9 ? h : ("0" + h);
            m = m > 9 ? m : ("0" + m);
            s = s > 9 ? s : ("0" + s);
        }
        return {d, h, m, s}
   },

    /**
     * 随机产生颜色
     */
    randomColor(){
        //toString (16) 16禁止进制
        return Math.random().toString(16).substring(2).substr(0,6);
    }





};

