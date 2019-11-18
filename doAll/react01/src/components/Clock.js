import React, { Component } from 'react'


export class Clock extends Component {
    state ={
        time:new Date().toLocaleString()
    }

    // 组件已经挂载
    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                time: new Date().toLocaleString()
            })
        }, 1000)
    }
    // 组件卸载
    componentWillUnmount(){
        console.log("组件卸载");
        clearInterval(this.timer)
    }
    
    render() {
        return (
            <div >
                <span>{this.state.time}</span>
            </div>
        )
    }
}

export default Clock