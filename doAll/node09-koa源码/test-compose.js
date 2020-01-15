async function fn1(next) {
    console.log("f1 start");
    return await next();
    console.log("f1 end");
}


// fn1(function() {
//     console.log("f1 next执行");
//     fn2(function() {
//         console.log("f2 next 执行", )
//         fn3(function() {
//             console.log("f3 next 执行")
//         })
//     })
// })

new Promise((resolve, reject) => {
    resolve(fn1)
}).then(fn => {
    // return Promise.resolve(fn2)
    return Promise.resolve(fn(function() {
        return fn2
    }))
}).then(fn => {
    console.log("25", fn)
})



async function fn2(next) {
    console.log("f2 start");
    await next();
    console.log("f2 end");
}

async function fn3(next) {
    console.log("f3 start");
    await next();
    console.log("f3 end");
}



var p = Promise.resolve(123);
var p1 = p.then(function(value) {
    console.log("p1", value)
});
var p2 = p1.then(function(value) {
    console.log("p2", value);
});
var p3 = p2.then(function(value) {
    console.log("p3", value);
});

// 放在里面打印就不会出现 pending 状态
p3.then(function() {
    console.log(p);
    console.log(p1);
    console.log(p2);
    console.log(p3);
})