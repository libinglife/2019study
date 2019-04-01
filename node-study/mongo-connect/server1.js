/**
 * Created by Libing on 2019/3/29 17:12
 */
let express =  require('express');
let app = express();
let MongoClient = require('mongodb').MongoClient;

app.get('/',(req,res)=>{

    //数据库地址
    let url = "mongodb://localhost:27017/mongoData";

    MongoClient.connect(url, {useNewUrlParser:true}, (err,client)=>{
        if(err){
            console.log("数据库连接失败");
            return;
        }
        console.log('数据库连接成功');

        let db = client.db('libingData'); //数据库名称

        db.collection('student').insertOne({"name":'李兵' , "age":parseInt(Math.random()*100)+10},(err,result)=>{
            if(err){
                console.log("插入失败");
                return
            }
            res.send(result);
            client.close();
        })
    })
});

app.listen(3001 , '127.0.0.1' ,()=>{
    console.log(`成功打开-----------127.0.0.1:3001`);
});