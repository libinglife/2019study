let Event = (function() {
    let list = {},
        listen,
        trigger,
        remove;

    // 监听事件函数 (订阅者)

    listen = function(key, fn) {
        if (!list[key]) {
            list[key] = []; //如果事件列表没有key值，命名空间 则创建
        }
        list[key].push(fn); //将回调函数推入对象的键值数组中
        console.log(list);
    };

    // 触发事件函数
    trigger = function() {

        //指定第一个参数 为指定键
        console.log(arguments)
        let key = Array.prototype.shift.call(arguments);
        msg = list[key];
        if (!msg || msg.length == 0) {
            return false
        }
        console.log(arguments)
            //循环回调数组执行回调函数
        for (let i = 0; i < msg.length; i++) {
            msg[i].apply(this, arguments);
            // msg[i](arguments);
        }
    };

    //移出事件函数
    remove = function(key, fn) {
        let msg = list[key];
        if (!msg) {
            return false;
        }

        if (!fn) {
            delete list[key];
        } else {
            msg.forEach((item, index) => {
                if (item === fn) {
                    msg.splice(index, 1) //删除特定回调数组中的回调函数
                }
            });
        }
    }

    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    }
})();

let fn = function(data) {
        console.log(data + '的推送消息：xxxxxx......');
    }
    // Event.listen("前端公众号", fn);
    // Event.trigger("前端公众号", "2019/12/18");