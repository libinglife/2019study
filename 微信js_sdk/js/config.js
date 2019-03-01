/**
 * WECHAT.js
 * Created by  isam2016
 */

import wx from 'weixin-js-sdk';
import axios from 'axios';

var JsWeChatApis = [
    'checkJsApi',
];

var isWeChatReady = false;// 检查微信wx.ready

export default class AlWeChat {
    constructor(object) {
        this.object = object;// vue 需要使用vue 解决回调
        this.wxConfig();// 初始微信配置
    }
    /**
     * 微信配置
     * @Author   Hybrid
     * @DateTime 2017-11-21
     */
    wxConfig() {
        let self = this;
        axios.get('/home/OrderConfirm/wxConfig', {
            params: {
                frontUrl: location.href.split('#')[0]// 前台吧url 传到后台 而且需要encodeURIComponent，
            }
        }).then(function(response) {
            var attachment = response.data.data;// 后台统一调配数据，返回前台
            // console.log(attachment);
            wx.config({
                debug: false,
                appId: attachment.appId,
                timestamp: attachment.timestamp, // 支付签名时间戳小写s 时间戳(timestamp)值要记住精确到秒，不是毫秒。
                nonceStr: attachment.nonceStr,//支付签名随机串，不长于 32 位,大写s
                signature: attachment.signature,
                url: attachment.url,
                jsApiList: JsWeChatApis
            });
            wx.ready(function () {
                isWeChatReady = true;
                self.object && self.wxQDetailShare()//分享到朋友圈+朋友的设置
            });
            wx.error(function (res) {
                //console.log(JSON.stringify(res));
            });

        }).catch(function (error) {
            // console.log(error)
        });
    }

    /**
     * 微信扫一扫
     * @Author   Hybrid
     * @DateTime 2017-11-21
     * @return   {[type]}   [description]
     */
    wxScanQRCode(fn) {
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                fn(result);
            }
        });
    }

    /**
     * 分享到朋友圈+朋友的设置
     * 可以动态设置
     * @Author   Hybrid
     * @DateTime 2017-11-21
     * @param    {}   data [展示数据]
     * @param    {[type]}   eqid [description]
     * @return   {[type]}        [description]
     */
    wxQDetailShare() {
        var config = {
            title: 'XXX',
            desc: 'XXX',
            imgUrl: 'XXX',
            link: 'XXX',
        };
        var shareConfig = {
            message: config,
            timeLine: {
                title: config.title,
                desc: config.desc,
                imgUrl: config.imgUrl,
                link: config.link,
            },
        };
        this.wxShare(shareConfig);
    }

    /**
     * 分享的基本配置
     * @Author   Hybrid
     * @DateTime 2017-11-21
     * @param    {}   shareConfig [不同类型的分享有不同的配置]
     * @return   {[type]}               [description]
     */
    wxShare(shareConfig) {
        let self = this;
        if (isWeChatReady) {
            /**
             * 分享到朋友圈
             * @Author   Hybrid
             */
            wx.onMenuShareTimeline({
                title: shareConfig.timeLine.title, // 分享标题
                link: shareConfig.timeLine.link, // 分享链接
                imgUrl: shareConfig.timeLine.imgUrl, // 分享图标
                success: function () {
                    self.object.closecovershow();// 回调
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    self.object.closecovershow();
                    // 用户取消分享后执行的回调函数
                }
            });

            /**
             * 分享给朋友
             * @Author   Hybrid
             */
            wx.onMenuShareAppMessage({
                title: shareConfig.message.title, // 分享标题
                desc: shareConfig.message.desc, // 分享描述
                link: shareConfig.message.link, // 分享链接
                imgUrl: shareConfig.message.imgUrl, // 分享图标  type: '', // 分享类型,music、video或link，不填默认为link
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    self.object.closecovershow();
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    self.object.closecovershow();
                    // 用户取消分享后执行的回调函数
                }
            });
        }
    }


    /**
     * 微信支付
     * @Author   Hybrid
     * @DateTime 2017-11-21
     * @param    {string}   router 单页面应用，由前台通知URL
     * @return   {[type]}          [description]
     */
    payWeChat(order_num) {
        let self = this;
        axios.get('/home/OrderConfirm/orderPay', {
            params: {
                type: 'weixin',
                frontUrl: location.href.split('#')[0],
                order_num// 订单号
            }
        }).then(function (response) {
            var attachment = response.data.data;// 后台返回参数
            localStorage.setItem(wechatCode, '');
            //alert(location.href)
            WeixinJSBridge.invoke('getBrandWCPayRequest', {
                "appId": attachment.appId,
                "timeStamp": attachment.timeStamp, // 大写S
                "nonceStr": attachment.nonceStr, // 大写S
                "package": attachment.package,
                "signType": 'MD5',
                "paySign": attachment.paySign,
            }, function (res) {
                // console.log(res);
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    self.object.$router.push("/paysuccess");
                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                    self.object.$router.push("/ordercenter");
                } else {
                    // localStorage.setItem(wechatCodeOld, '');
                    localStorage.setItem(wechatCode, '');
                    //alert("支付失败!" + JSON.stringify(res) + "当前路径" + location.href);
                    // alert("支付失败!" + JSON.stringify(res));
                    //   resolve(-1);
                }
            })

        }).catch(function (err) {
            console.log(JSON.stringify(err));
        })
    }
}