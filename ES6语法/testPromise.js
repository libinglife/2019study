/*
 * @version: 
 * @Author: 李兵
 * @Date: 2020-04-15 15:02:47
 * @LastEditTime: 2020-04-15 15:55:27
 */
let axios = require('axios')
    // 
async function asyncTest() {
    let p1 = await axios('http://localhost:3008/get')
    let p2 = await axios('http://localhost:3008/get')
    let p3 = await axios('http://localhost:3008/get')
    console.log(p1.data + p2.data + p3.data)
}

function promiseTest() {
    let p1 = axios('http://localhost:3008/get?num=' + 1)
    let p2 = axios('http://localhost:3008/get?num=' + 2)
    let p3 = axios('http://localhost:3008/get?num=' + 3)
    Promise.all([p1, p2, p3]).then(res => {
        console.log(res[0].data)
        console.log(res[1].data)
        console.log(res[2].data)
    })
}
promiseTest()