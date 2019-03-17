import  Vue from 'vue' ;
import VueRouter from "vue-router" ;
import  p1 from "../components/p1";
import  p2 from "../components/p2";

Vue.use(VueRouter);
export default new VueRouter({
  routes:[
    {
      path:'/',
      name:'p1' ,
      component: p1
    },
    {
      path:'/p2',
      name:'p2',
      component:p2
    }
  ]
})
