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

// async function fn () {
//     const f1 = await  readFile('./data/a.text');
//     console.log(f1.toString());
//     const f2 =await  readFile("./data/b.text");
//     console.log(f2.toString());
//     const  f3 = await  readFile("./data/c.text");
//     console.log(f3.toString());
// }

fn();
async function fn () {
    const f1 = await  readFile('./data/a.text');
    console.log(f1.toString());
    const f2 =await  readFile(f1.toString());
    console.log(f2.toString());
    const  f3 = await  readFile(f2.toString());
    console.log(f3.toString());
}


//加入请求没有关系
// demo()
async function demo() {
    let p1 = readFile('./data/a.text');
    let p2 = readFile('./data/b.text');
    let p3 = readFile('./data/c.text');

    var res = await Promise.all([p1, p2, p3]);
    let [a,b,c] = res;
    console.log(a.toString());
    console.log(b.toString());
    console.log(c.toString())
}

