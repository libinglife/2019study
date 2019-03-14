let fs = require('fs');

let readFile =function (url) {
    return new Promise((resolve ,reject) => {
        fs.readFile(url ,(err , data)=>{
            if(err){
                reject(err)
            }else {
                resolve(data);
            }
        })
    })
};

function * gen () {   // 定义 gen 生成器函数
   let res1 = yield readFile("./data/a.text");
   // console.log(res1)
   let res2 = yield readFile(res1);
    // console.log(res2)
   let res3 = yield readFile(res2);
}

let fn = gen();
// console.log(fn.next());
fn.next().value.then(res=>{
    console.log(res.toString());
    return fn.next(res.toString()).value
}).then(res=>{
    console.log(res.toString());
    return fn.next(res.toString()).value
}).then(res=>{
    console.log(res.toString())
}).catch(err=>{
    console.log(err)
});


