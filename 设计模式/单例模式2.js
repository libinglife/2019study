//参考链接： https: //www.cnblogs.com/escapist/p/8527367.html
//1 单例传参 使用apply

let SingleTest = (function() {
    let instance = null;

    function _init(ops) {
        for (let key in ops) {
            this[key] = ops[key]
        }
    }
    // console.log(this)
    return function() {

        this.name = "内部"
        if (instance == null) {
            instance = this;
        }
        _init.apply(instance, arguments);
        return instance
    }
})();

// console.log(SingleTest);

let i1 = new SingleTest({ age: 10, sex: "男" });
console.log(i1);

let i2 = new SingleTest({ age: 20, sex: "女" });

console.log(i2);
// console.log(i1 === i2);


// 2.不使用apply

let SingleTwo = (function() {
    let _instance = null;

    SingleInstance.prototype._init = function(ops) {
        for (let key in ops) {

            this[key] = ops[key]
        }
    }

    function SingleInstance(args) {
        if (_instance == null) {
            _instance = this
        }
        // let arr = Array.prototype.slice.call(arguments)
        // console.log(arr);
        // console.log("this:", this)
        console.log("_instance:", _instance)

        console.log(_instance === this)
            // console.log(args)
        _instance._init(args);
        return _instance;
    }
    return SingleInstance
})();

let s1 = new SingleTwo({ name: "李兵" });
// console.log(s1);

let s2 = new SingleTwo({ name: "老铁", age: 12 });
let s3 = new SingleTwo({ name: "哈哈", age: 12 });
// console.log(s2);



// 3.有的人不适用new来创建对象，而是使用 let i1 = SingleTest() 这样来创建对象 


let SingleThree = (function() {
    let _instance = null;

    SingleInstance.prototype._init = function(ops) {
        for (let key in ops) {
            this[key] = ops[key]
        }
    }

    function SingleInstance(args) {
        if (this instanceof SingleInstance) { //判断是否是他的实例
            console.log("new 出来的")
            if (_instance == null) {
                _instance = this
            }
            _instance._init(args)
            return _instance
        } else {
            console.log("函数()出来的")
            if (_instance == null) {
                _instance == new SingleInstance()
            }
            _instance._init(args)
            return _instance
        }
    }

    return SingleInstance
})();


let t1 = new SingleThree({ name: "卡戴珊1" });
console.log(t1);

let t2 = new SingleThree({ name: "卡戴珊2", sex: '女' });
console.log(t2);

let t3 = SingleThree({ name: "卡戴珊3", age: '24' });
console.log(t3);