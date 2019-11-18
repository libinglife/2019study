import React, { Component } from 'react'

export default class StateTest extends Component {

    state = {
        counter: 1
    }
    componentDidMount() {
        // 不能直接修改状态值
        // this.state.counter+=1; 错误示范

        // 批量执行
        // this.setState({},cb)
        this.setState({
            counter: 2
        },function(){
            console.log("执行回调");
            
        })
        this.setState(prevState=>{
            return {
                counter :prevState.counter+1
            }
        })
        this.setState(prevState => {
            return {
                counter: prevState.counter + 1
            }
        })
        this.setState(prevState=>({
            counter: prevState.counter + 1
        }),function (e) {
            console.log("成功回调");
        })
    }

    render() {
        return (
            <div>
                {this.state.counter}
            </div>
        )
    }
}
