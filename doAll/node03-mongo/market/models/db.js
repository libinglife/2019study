const conf = require('./conf');
const EventEmitter = require('events').EventEmitter;
// 客户端
const MongoClient = require('mongodb').MongoClient;

class Mongodb {
    constructor(conf) {
        // 保存conf
        this.conf = conf;
        this.emmiter = new EventEmitter();
    }
}