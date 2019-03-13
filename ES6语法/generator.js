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

function * gen () {
    yield readFile("./data/a.text");
    yield readFile("./data/b.text");
    yield readFile("./data/c.text");
}

let fn = gen();
// console.log(fn.next());
fn.next().value.then(res=>{
    console.log(res.toString());
    return fn.next().value
}).then(res=>{
    console.log(res.toString());
    return fn.next().value
}).then(res=>{
    console.log(res.toString())
}).catch(err=>{
    console.log(err)
})


