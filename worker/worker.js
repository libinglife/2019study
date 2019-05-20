/**
 * Created by Libing on 2019/4/23 13:55
 */

//通俗点讲就是：因为js是单线程运行的，在遇到一些需要处理大量数据的js时，可能会阻塞页面的加载，造成页面的假死。这时我们可以使用worker来开辟一个独立于主线程的子线程来进行哪些大量运算。这样就不会造成页面卡死。也说明 worker可以用来解决大量运算是造成页面卡死的问题。

self.onmessage = function (event) {
    console.log(event)
    var data = event.data;
    var ans = fibonacci(data);
    this.postMessage(ans);
};

function fibonacci(n) {
    return n < 2 ? n : arguments.callee(n - 1) + arguments.callee(n - 2);
}