/*
 * @version: 
 * @Author: 李兵
 * @Date: 2020-04-17 22:12:12
 * @LastEditTime: 2020-04-20 10:23:00
 */
// import { add, escapeHtml } from './other.js'
import others from './other.js'
// import { add } from './other.js'
import pic from './imgs/1.jpg'
// import './css/test.css'
import './css/two.css'
import './css/study.less'
import './css/study2.less'

let { add, escapeHtml } = others
// console.log(others)
// console.log(escapeHtml)
escapeHtml("“jfsa&<")
    // let 没有变量提升
function test() {
    console.log(a) //会报错
    let a = 11;
}

// test()
console.log(pic)
console.log(add(666, 4))
console.log("hello webpack")