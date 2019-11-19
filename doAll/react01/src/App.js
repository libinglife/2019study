import React, { Component } from 'react';
import logo from "./logo.svg";

import './App.css'
import { Welcome1 ,Welcome2 } from './components/CompType';
import { Clock } from './components/Clock';
import StateTest from './components/StateTest';
import CartSample from './components/CartSample';

import LifeCycle from "./components/LifeCycle";


// 格式名
function formatName (user){
    return user.firstName + " " + user.lastName;
}

class App extends Component {

    state ={
        name:'生命周期1'
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                name:"生命周期2"
            })
        }, 2000);
    }
    
    render() {
        const name = "jerry";
        const jsx = <p>李兵</p>;
        const user = {firstName:"tom",lastName:"jerry"};
        return (

            <div className="App">
                <img src={logo} className="App-logo" alt=""/>
                {/* 表达式 */}
                <h1>{name}</h1>
                <div>{formatName(user)}</div>

                {/* jsx也是表达式 */}
                <div>{jsx}</div>

                {/* 属性 */}
                <img src={logo} style={{width:"100px",border:'1px solid red'}} alt=""/>

                {/* 使用其他组件 */}
                <Welcome1 name="属性名1"></Welcome1>
                <Welcome2 name="属性名2"></Welcome2>

                {/* state 和状态改变setState */}
                <Clock></Clock>
                <StateTest></StateTest>

                {/* 条件循环 */}
                <CartSample title="购物车"></CartSample>

                {/*生命周期渲染*/}
                <LifeCycle name={this.state.name}></LifeCycle>

            </div>
        );
    }
}



export default App;