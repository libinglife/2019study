
<?php
   namespace Vendor\wxpay;//命名空间
   /**
    * Class wxpay
    * @package Vendor\wxpay
    * @name 用于签名生产
    * @author weikai
    */
   class wxpay {
       private $appId;
       private $appSecret;

       public function __construct($appId, $appSecret) {
           $this->appId = $appId;
           $this->appSecret = $appSecret;
       }
       //获取签名
       public function getSignPackage() {
           $jsapiTicket = $this->getJsApiTicket();//获取JsApiTicket

           // vue管理路由 url参数建议前台传递
           $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
           // $url = "$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";//如果后台获取url
           $url = I('get.frontUrl');//获取前台传递的url
           $timestamp = time();//现在时间戳
           $nonceStr = $this->createNonceStr();//生成随机字符串

           // 这里参数的顺序要按照 key 值 ASCII 码升序排序
           $string = "jsapi_ticket=$jsapiTicket&noncestr=$nonceStr&timestamp=$timestamp&url=$url";

           $signature = sha1($string);//sha1加密排序后的参数生产签名
        //将所有参数赋值到数组
           $signPackage = array(
               "appId"     => $this->appId,
               "nonceStr"  => $nonceStr,
               "timestamp" => $timestamp,
               "url"       => $url,
               "signature" => $signature,
               "rawString" => $string
           );

           return $signPackage;
       }

    //生成随机字符串
       private function createNonceStr($length = 16) {
           $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
           $str = "";
           for ($i = 0; $i < $length; $i++) {
               $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
           }
           return $str;
       }
    //生成JsApiTicket
       private function getJsApiTicket() {
           // jsapi_ticket 全局存储与更新
           $data = json_decode(S('jsapi_ticket'));
         //如果缓存中的JsApiTicket 不在有效期内重新生成JsApiTicket
           if ($data->expire_time < time()) {
               $accessToken = $this->getAccessToken();//获取AccessToken
               // 如果是企业号用以下 URL 获取 ticket
               // $url = "https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=$accessToken";
               $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=$accessToken";
               $res = json_decode($this->httpGet($url));
               $ticket = $res->ticket;
             //更新有效期存入缓存
               if ($ticket) {
                   $data->expire_time = time() + 7000;
                   $data->jsapi_ticket = $ticket;
                   S('jsapi_ticket',json_encode($data));
               }
           } else {
             //否则缓存中的JsApiTicket 在有效期内就直接用
               $ticket = $data->jsapi_ticket;
           }

           return $ticket;
       }
    //获取全局AccessToken
       public function getAccessToken() {
           // access_token 全局存储与更新
           $data = json_decode(S('access_token'));
           if ($data->expire_time < time()) {
               // 如果是企业号用以下URL获取access_token
               // $url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=$this->appId&corpsecret=$this->appSecret";
               $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$this->appId&secret=$this->appSecret";
               $res = json_decode($this->httpGet($url));
               $access_token = $res->access_token;
               if ($access_token) {
                   $data->expire_time = time() + 7000;
                   $data->access_token = $access_token;
                   S('access_token',json_encode($data));
               }
           } else {
               $access_token = $data->access_token;
           }
           return $access_token;
       }

       //curl 请求
       private function httpGet($url) {
           $curl = curl_init();
           curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
           curl_setopt($curl, CURLOPT_TIMEOUT, 500);
           // 为保证第三方服务器与微信服务器之间数据传输的安全性，所有微信接口采用https方式调用，必须使用下面2行代码打开ssl安全校验。
           // 如果在部署过程中代码在此处验证失败，请到 http://curl.haxx.se/ca/cacert.pem 下载新的证书判别文件。
           curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
           curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, true);
           curl_setopt($curl, CURLOPT_URL, $url);

           $res = curl_exec($curl);
           curl_close($curl);

           return $res;
       }


   }