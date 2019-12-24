const jsonwebtoken = require('jsonwebtoken');

const secret = "123456";

// const opt = {
//     secret: 'jwt_secret',
//     key: 'user'
// }

const user = {
    name: "李兵",
    password: '111111'
}

const token = jsonwebtoken.sign({
    data: user,
    exp: Math.floor(Date.now() / 1000) + 3600
}, secret);

console.log("生成秘钥：", token);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
// .eyJkYXRhIjp7Im5hbWUiOiLmnY7lhbU
// iLCJwYXNzd29yZCI6IjExMTExMSJ9LCJle
// HAiOjE1NzcxMDIxOTIsImlhdCI6MTU3NzA5ODU5Mn0
// .WRWqA2ZP81fFGrY5URHV-5EOHctXEka5ef0zD3it8jpM

// 解码


const resToken = jsonwebtoken.verify(token, secret);

console.log("解码：", resToken);

// 解码： {
//     data: { name: '李兵', password: '111111' },
//     exp: 1577102612,
//         iat: 1577099012
// }