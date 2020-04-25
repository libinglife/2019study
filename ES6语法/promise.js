/*
 * @version: 
 * @Author: 李兵
 * @Date: 2019-04-20 18:58:10
 * @LastEditTime: 2020-04-15 15:31:03
 */
let fs = require('fs');

let readFile = function(url) {
    return new Promise((resolve, reject) => {
        fs.readFile(url, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
};

// readFile('./data/a.text').then(res=>{
//     console.log(res.toString());
//     return readFile("./data/b.text")
// }).then(res=>{
//     console.log(res.toString());
//     return readFile("./data/c.text")
// }).then(res=>{
//     console.log(res.toString())
// });


readFile('./data/a.text').then(res => {
    console.log(res.toString());
    let url = res.toString()
    return readFile(url)
}).then(res => {
    console.log(res.toString());
    let url = res.toString()
    return readFile(url)
}).then(res => {
    console.log(res.toString())
});