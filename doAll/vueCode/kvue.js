//实现自己的k-vue

class KVue {
    constructor(option) {
        this.$option = option;

        //数据响应化
        this.$data = option.data;
        this.observer(this.$data);

        // //模拟watcher 创建
        // new Watcher();
        // this.$data.name;
        // // 模拟watcher 创建
        // new Watcher();
        // this.$data.foo.test;
        new Compile(option.el, this);

        // created执行
        if (option.created) {
            option.created.call(this)
        }

    }

    // 观察者
    observer(value) {
            if (!value || typeof value !== "object") {
                return
            }
            Object.keys(value).forEach(key => {
                this.defineReactive(value, key, value[key]);
                //代理data中的数据到vue实例上
                this.proxyData(key)
            })
        }
        // 数据响应化
    defineReactive(obj, key, val) {
            // 递归解决数据嵌套
            console.log(val);
            this.observer(val);

            let that = this;
            const dep = new Dep();
            Object.defineProperty(obj, key, {
                enumerable: true, //是否可以枚举
                configurable: true, //属性可被修改或被删除
                get() {
                    console.log("key", key, Dep.target);
                    Dep.target && dep.addDep(Dep.target)
                    return val
                },
                set(newVal) {
                    if (newVal == val) {
                        return
                    }

                    val = newVal;

                    // that.cb(newVal)
                    dep.notify();
                }
            })
        }
        // 回调函数
    cb(val) {
        console.log("刷新数据：" + val)
    }
    proxyData(key) {
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key]
            },
            set(newVal) {
                console.log("先执行这里")
                this.$data[key] = newVal
            }
        })
    }
}

//Dep用来管理watcher
class Dep {
    constructor() {
        // 这里存放若干依赖
        this.deps = []
    }

    // 添加依赖
    addDep(dep) {
        console.log(this.deps);
        this.deps.push(dep)
    }
    notify() {
        this.deps.forEach(dep => {
            dep.update()
        })
    }
}

//Watcher 类似订阅者

class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm;
        this.key = key;
        this.cb = cb;
        //将当前watcher 实例指定到Dep静态属性target
        Dep.target = this;
        this.vm[this.key]; //触发getter 添加依赖
        Dep.target = null;
    }

    update() {
        // console.log("属性更新了");
        this.cb.call(this.vm, this.vm[this.key])

    }
}