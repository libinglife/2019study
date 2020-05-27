//用法 new Compile(el,vm);

class Compile {
    constructor(el, vm) {

        // 要遍历的宿主节点
        this.$el = document.querySelector(el);
        this.$vm = vm;

        // 编译
        if (this.$el) {
            //转换内部内容为片段 fragment
            this.$fragment = this.node2Fragment(this.$el);
            console.table(this.$fragment);

            //执行编译
            this.compile(this.$fragment);
            //将编译完的html结果追加$el
            this.$el.appendChild(this.$fragment);
        }
    }

    //将宿主元素中的代码片段拿出来 遍历 ，会比较高效
    node2Fragment(el) {

        const frag = document.createDocumentFragment();

        let child;
        while ((child = el.firstChild)) {
            frag.appendChild(child);
        }
        return frag

    }

    //编译过程
    compile(el) {
        const childNodes = el.childNodes;
        let childNodesArr = Array.from(childNodes);
        console.log(childNodesArr);

        childNodesArr.forEach(node => {
            //  类型判断
            // console.log("43", node);

            if (this.isElement(node)) {
                //元素
                // console.log("编译元素" + node.nodeName);
                // console.log(node);

                // 查找k-,@, : 
                const nodeAttrs = node.attributes;
                Array.from(nodeAttrs).forEach(attr => {
                    // console.log(attr);
                    const attrName = attr.name; //属性名
                    const exp = attr.value; //属性值
                    // 是不是指令
                    if (this.isDirective(attrName)) {
                        // k-text
                        const dir = attrName.substring(2);
                        // console.log(dir);
                        //   执行指令
                        this[dir] && this[dir](node, this.$vm, exp)
                    }

                    if (this.isEvent(attrName)) {
                        const dir = attrName.substring(1) //@click
                        this.eventHandler(node, this.$vm, exp, dir)
                    }
                });
            } else if (this.isInterpolation(node)) {
                // 是不是插值绑定
                console.log("编译文本" + node.textContent);
                this.compileText(node)
            }

            // 递归子节点
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }

    // 插值编译
    compileText(node) {
        this.update(node, this.$vm, RegExp.$1, 'text');
    }

    // 双绑
    model(node, vm, exp) {
        // 指定 input 的 value 属性
        this.update(node, vm, exp, 'model');

        //视图对模型响应
        node.addEventListener('input', e => {
            vm[exp] = e.target.value;
        })
    }
    modelUpdater(node, value) {
        node.value = value;
    }

    // text指令
    text(node, vm, exp) {
        this.update(node, vm, exp, 'text');
    }
    textUpdater(node, value) {
        node.textContent = value;
        // node.innerText = value;
    }

    // html 指令
    html(node, vm, exp) {
        this.update(node, vm, exp, 'html')
    }
    htmlUpdater(node, value) {
        // console.log(value);

        node.innerHTML = value
    }


    // 更新函数
    update(node, vm, exp, dir) {
        const updaterFn = this[dir + "Updater"];
        //  初始化
        updaterFn && updaterFn(node, vm[exp]);

        // 依赖收集
        new Watcher(vm, exp, function(value) {
            updaterFn && updaterFn(node, vm[exp]);
        })
    }


    // 事件处理器
    eventHandler(node, vm, exp, dir) {

        // @click
        let fn = vm.$option.methods && vm.$option.methods[exp];
        if (dir && fn) {
            node.addEventListener(dir, fn.bind(vm))
        }
    }

    // 是否元素 elemment
    isElement(node) {
        return node.nodeType === 1
    }

    // 是不是指令
    isDirective(attrName) {
        return attrName.indexOf("k-") == 0;
    }

    // 是不是事件
    isEvent(attrName) {
        return attrName.indexOf("@") == 0
    }

    // 插值文本
    isInterpolation(node) {
        // console.log(node.textContent);
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
}