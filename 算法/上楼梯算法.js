// 有N阶楼梯，每次只可以上1个或者两个，总共有多少算法

// 假如有100阶楼梯 只可以从98阶或者99两种方式上来
// f(100) =f(99)+f(98)


// f(n) = f(n-1)+f(n-2)

function f(n) {
    if (n == 1) {
        return 1
    }
    if (n == 2) {
        return 2
    }

    if (n > 2) {
        return f(n - 1) + f(n - 2)
    }
}

// 算45阶已经很费力了 需要优化下
// console.log(f(45)) 1836311903


// 优化方案 用空间换时间 

// 第一种  开辟一个数组

function good1(n) {
    let arr = new Array(n + 1).fill(0);
    arr[1] = 1;
    arr[2] = 2;

    for (let index = 3; index < n + 1; index++) {

        arr[index] = arr[index - 1] + arr[index - 2]
    }
    // console.log(arr)
    return arr[n]
}
console.log(good1(50))

// 第二种  开辟一个对象 两个函数互相调用

let obj = {}

function good2(n) {

    if (!(n in obj)) {
        obj[n] = _f(n)
    }

    return obj[n]
}

function _f(n) {

    if (n == 1 || n == 2) {
        return n
    }
    return good2(n - 1) + good2(n - 2)
}

console.log(good2(50))