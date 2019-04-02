/**
 * Created by Libing on 2019/3/29 16:51
 */

let MongoClient = require('mongodb').MongoClient;

//封装为内部函数
function _connectDB(callback) {
    let url = 'mongodb://localhost:27017/mongoData';
    MongoClient.connect(url ,{useNewUrlParser:true},(err,client)=>{
        if(err){
            callback(err,null);
            return
        }
        callback(err,client);
    })
}

//插入数据
exports.insertOne =function (collectionName ,json ,callback) {
    _connectDB((err,client)=>{
        let db = client.db('libingData');
        db.collection(collectionName).insertOne(json,(err,result)=>{
            callback(err,result);
            client.close();
        })
    })
};

//查找数据
exports.find = function (collectionName , json ,C , D ) {
    if(arguments.length==3){
        var callback = C ; //D参数没传
        var skipnumber = 0 ;
        //数目限制
        var limit = 0 ;
    }else if(arguments.length == 4){
        var callback = D ;
        var args = C ;
        //应该省略的条数
        var skipnumber  = args.pageamount*args.page || 0 ;
        //数目限制
        var limit = args.pageamount || 0 ;
        //排序方式
        var sort = args.sort || {};
    }else {
        throw new Error('find函数的参数个数，必须是3个，或者4个。');
        return ;
    }
    //连接数据库
    _connectDB((err , client)=>{
        let db = client.db('libingData');
        let cursor = db.collection(collectionName).find(json).skip(skipnumber).limit(limit).sort(sort);
        // let cursor = db.collection(collectionName).find(json).skip(skipnumber).limit(limit);
        cursor.toArray((err,result)=>{
          if(err){
              throw err
          }else {
              callback(null,result);
              client.close();
          }
        })
    })
};


// 删除数据
exports.deleteMany = function (collectionName , json ,callback) {
    _connectDB((err,client)=>{
        let db = client.db('libingData');
        db.collection(collectionName).deleteMany(json , (err ,result) =>{
            callback(err ,result);
            client.close();
        })
    })
};
//修改
exports.updateMany = function (collectionName , jsonBefore ,jsonAfter , callback) {
    _connectDB((err,client)=>{
        let db = client.db('libingData');
        db.collection(collectionName).updateMany(jsonBefore , jsonAfter ,(err ,results)=>{
            callback(err,results);
            client.close()
        })
    })
};

// 获取数据总条数
exports.getAllCount = function (collectionName ,callback) {
    _connectDB((err, client)=>{
        let db = client.db('libingData');
        db.collection(collectionName).countDocuments({}).then((count)=>{
            client.close()
            callback(count)

        }).catch((errinfo)=>{
            console.log(errinfo)
        })
    })
};








// function insertOne(collectionName ,json ,callback) {
//     _connectDB((err,client)=>{
//         let db = client.db('libingData');
//         db.collection(collectionName).insertOne(json,(err,result)=>{
//             callback(err,result);
//             client.close();
//         })
//     })
// }
//
// module.exports={
//     insertOne
// };

