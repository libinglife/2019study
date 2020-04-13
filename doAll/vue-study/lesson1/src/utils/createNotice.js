import Vue from 'vue'
import Notice from "@/components/notice";
// export default function createNotice(prop, componentName) {
export default function createNotice(prop) {
    // 1 创建vue 实例
    let vm = new Vue({
        render(h) {
            return h(Notice, { props: prop })
        }
    }).$mount()

    console.log(vm)


    //2 获取该组件实例 
    const comp = vm.$children[0]

    //3.手动挂载到body 上
    document.body.appendChild(comp.$el)

    // document.body.appendChild(vm.$el)
    console.log(vm)

    //4.清理函数
    comp.remove = function() {

        document.body.removeChild(comp.$el)
        comp.$destroy()

        // document.body.removeChild(vm.$el)
        // vm.$destroy()
    }

    // 5.返回创建的组件实例

    return comp
}