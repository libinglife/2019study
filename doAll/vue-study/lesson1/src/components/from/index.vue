<template>
<div class="form">
    <!-- 这是语法糖 -->

    <KFrom :model="model" :rules="rules" ref="loginFrom">
        <KFromItem label="用户名:" prop="name">
            <Kinput v-model="model.name" type="text" test="test"></Kinput>
        </KFromItem>

        <KFromItem label="密码:" prop="password">
            <Kinput v-model="model.password" type="password" jiji="dandan"></Kinput>
        </KFromItem>

        <button @click="onLogin">提交</button>
    </KFrom>

    <!-- 这是背后的写法 -->
    <!-- <Kinput
      :value="model.name"
      @input="model.name=arguments[0]"
    ></Kinput> -->

    {{model}}
</div>
</template>

<script>
import Kinput from "./Kinput";
import KFromItem from "./KFromItem";
import KFrom from "./KFrom";

export default {
    components: {
        Kinput,
        KFromItem,
        KFrom
    },
    props: {},
    data() {
        return {
            model: {
                name: "李兵",
                password: ""
            },
            rules: {
                name: [{
                    required: true,
                    message: "名字必须要填"
                }],
                password: [{
                    required: true,
                    message: "密码必须要填"
                }]
            }
        };
    },
    watch: {},
    computed: {},
    methods: {
        atInput(e) {
            console.log(e);
            this.model.name = e;
        },

        // 全局登录校验
        onLogin(){

           
            this.$refs.loginFrom.allValidator((error)=>{
                console.log(error)
                if(error){
                    // alert(error.message)
                    this.$createNotice({
                        title:"提示信息",
                        message:error.message,
                        duration:3000
                    }).show()
                    
                }else{
                    // alert("可以登录")
                    this.$createNotice({
                        title:"提示信息",
                        message:"可以登录",
                        duration:3000
                    }).show()
                    
                }
            })
        }
    },
    created() {},
    mounted() {}
};
</script>
