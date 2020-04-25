<!--
 * @version: 
 * @Author: 李兵
 * @Date: 2019-04-20 18:58:10
 * @LastEditTime: 2020-04-16 15:43:18
 -->

一.解决异步回调

   例如有三个请求需要发生，第三个请求是依赖于第二个请求的结果 第二个请求依赖于第一个请求的结果，若用 ES5实现会有3层的回调

   解决方法（"化异步为同步"）：
    1.promise
    2.generator 生成器函数
    3.async await

    -----------------------
    1.promise : new一个Promise对象时，要传入一个函数，而这个函数一般有两个参数，一个是resolve，另一个是reject
        var p1 = new Promise() ;
        调用 p1.then() 即可   .catch() 捕获错误

    ----------------------
    2.generator :它是一个生成器，它也是一个状态机，内部拥有值及相关的状态，生成器返回一个迭代器Iterator对象，我们可以通过这个迭代器，手动地遍历相关的值、状态，保证正确的执行顺序。

    定义 gen 生成器函数
    function * gen() {
        yield 'one';
        yield 'two';
        return 'three';
    }

    var show = gen(); 调用之后返回了一个迭代器对象

    调用 .next 会执行yield  会输出 {done: 当前的状态, value: yield后面的运算结果 }

    show.next() // {done: false, value: "one"}
    show.next() // {done: false, value: "two"}
    show.next() // {done: true, value: "three"}
    show.next() // {done: true, value: undefined}

    ----------------------
    3.async await :  async用来表示函数是异步的，定义的函数会返回一个promise对象
                   await 可以理解为是 async wait 的简写。await 必须出现在 async 函数内部，不能单独使用,
                   它最主要的意图是用来等待 Promise 对象的状态被 resolved
    eg:
    async function fn() {
         await  1
    }

    ```javascript

    let a = 
    ```