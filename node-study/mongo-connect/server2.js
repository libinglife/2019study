/**
 * Created by Libing on 2019/3/29 17:12
 */
let express =  require('express');
let app = express();

let db =require('./model/db.js');


//插入数据
app.get('/',(req,res)=>{
    db.insertOne('student',{"name":'小兵' , "age":parseInt(Math.random()*100)+10} ,(err,result)=>{
        if(err){
            console.log("插入失败");
            return
        }
        res.send(result)
    })
});

//查找
app.get("/find" , (req, res)=>{
    let page  = parseInt(req.query.page);
    console.log(page);
    // db.find('student' , {"age":20} ,{"pageamount":2 , "page" : page} ,(err,result)=>{
    db.find('student' , {"age":64}  ,(err,result)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log(result);
        res.send(result);
    })
});

//删除数据
app.get('/delete' , (req, res)=>{
    var age = req.query.age ;
    console.log(age)
    db.deleteMany('student', {"age":parseInt(age)}, (err, result)=>{
        if(err){
            throw err
        }
        res.send(result)
    })
});

//修改数据
app.get('/updata' , (req , res)=>{
   db.updateMany('student' ,
       {'name': '小兵子1'} ,
       {$set : {"name" :'小兵子1', "age":10}},
       (err ,result)=>{
          if(err){
              throw err
          }
          res.send(result)
       }
   )
});

//获取总条数
app.get('/count' , (req ,res)=>{
    db.getAllCount('student' ,(result)=>{
        console.log(typeof result);
        res.send(result.toString()+'条');
        // res.end(result.toString());
    })
});


app.listen(3001 , '127.0.0.1' ,()=>{
    console.log(`成功打开-----------127.0.0.1:3001`);
});