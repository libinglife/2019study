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

async function fn () {
    const f1 = await  readFile('./data/a.text');
    console.log(f1.toString());
    const f2 =await  readFile(f1.toString());
    console.log(f2.toString());
    const  f3 = await  readFile(f2.toString());
    console.log(f3.toString());
}

fn();

