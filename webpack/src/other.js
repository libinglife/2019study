/*
 * @version: 
 * @Author: 李兵
 * @Date: 2020-04-19 11:17:27
 * @LastEditTime: 2020-04-20 10:26:57
 */

let add = (a, b) => a + b

// 为了保证页面输出安全，我们经常需要对一些特殊的字符进行转义，请写
// 一个函数  escapeHtml ，将 <, >, &, “

let escapeHtml = (str) => {
    let res = str.replace(/[<>&“]/g, function(match) {
        console.log(match)
        switch (match) {
            case "<":
                return "$lt;"
            case ">":
                return "$gt;"
            case "&":
                return "&amp;"
            case "“":
                return "&quot;"
        }
    })
    console.log(res)

    return res
}


export default { add, escapeHtml }