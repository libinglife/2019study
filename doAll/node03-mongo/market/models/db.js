const conf = require('./conf');
const EventEmitter = require('events').EventEmitter;
// 客户端
const MongoClient = require('mongodb').MongoClient;

class Mongodb {
    constructor(conf) {
        // 保存conf
        this.conf = conf;
        this.emmiter = new EventEmitter();
        this.client = new MongoClient(conf.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        this.client.connect((err) => {
            if (err) throw err;
            console.log("初始化链接成功");

            this.emmiter.emit('connect');
        })
    }
    once(event, cb) {
        console.log("once:", "once成功")
        this.emmiter.once(event, cb)
    }
    col(colName, dbName = conf.dbName) {
        return this.client.db(dbName).collection(colName);
    }
}

module.exports = new Mongodb(conf);