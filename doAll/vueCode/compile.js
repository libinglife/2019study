//用法 new Compile(el,vm);

class Compile {
    constructor(el, vm) {

        // 要遍历的宿主节点
        this.$el = document.querySelector(el);
        this.$vm = vm;

        // 编译
        if (this.$el) {
            //转换内部内容为片段 fragment
            this.$fragment = this.node2Fragement(this.$el);
            console.log(this.$fragment);

            //执行编译
            this.compile(this.$fragment);
            //将编译完的html结果追加$el
            this.$el.appendChild(this.$fragment);
        }
    }

    //将宿主元素中的代码片段拿出来 遍历 ，会比较高效
    node2Fragement(el) {

        const frag = document.createDocumentFragment();
        console.log(frag);
        let child;
        while ((child = el.firstChild)) {
            frag.appendChild(child);
        }
        return frag

    }
}