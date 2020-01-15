// const add = (...args) => {
//     let arr = [...args];
//     let res = 0;
//     arr.forEach(item => {
//         res = res + item;
//     })
//     return res;
// }
// const square = z => z * z

// // const res = square(add(1, 2))

// // console.log(res)

// // 组成函数
// function compose(...args) {
//     const [f1, ...others] = [...args];

//     return function(...param) {
//         console.log(...param)
//         console.log(Array.isArray(param))
//         let res = f1(...param);
//         others.forEach(fn => {
//             res = fn(res)
//         });
//         return res
//     }
// }
// const resFn = compose(add, square, square, square);
// console.log(resFn(1, 2, 3, 4))

async function fn1(next) {
    console.log("f1 start");
    await next();
    console.log("f1 end");
}

async function fn2(next) {
    console.log("f2 start");
    await next();
    console.log("f2 end");
}

async function fn3(next) {
    console.log("f3 start");
    let res = await next();
    console.log("47", res)
    console.log("f3 end");
}

// 组成函数
function compose(...fns) {

    const middleware = [...fns];
    // console.log(middleware);
    return dispatch(0)

    function dispatch(index) {
        const fn = middleware[index]
        if (!fn) {
            return Promise.resolve("结束了");
        }
        // console.log("执行：", index)
        return Promise.resolve(fn(function next() {
            return dispatch(index + 1)
        }))
    }
}
const resFn = compose(fn1, fn2, fn3);
// console.log("resFn", resFn); //此时打印会出现 promise pending 

resFn.then((res) => {
    // 放在这里打印不会出现 promise pending 
    // console.log('res', res)
    console.log("resFn", resFn);
})