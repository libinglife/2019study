import React, { Component } from 'react'

export default class CartSample extends Component {

    // 状态初始化，一般放在构造器中
    constructor(props) {
        super(props);

        this.state ={
            goods: [
                { id: 1, text: "web全栈架构师" },
                { id: 2 ,text:"java架构师"},
            ],
            text:'',
            cart:[]
        }
    }

    // 内容改变
    textChange = (e) => {
        console.log(e.target.value);
        this.setState({
            text: e.target.value
        })
    }

    render() {
        return (
            <div className="cartSample">
                {/* 条件渲染 */}
                {this.props.title && <h1>{this.props.title}</h1>}

                {/* 列表渲染 */}
                <ul>
                    {this.state.goods.map((good)=>{
                        return <li key={good.id}>{good.id}号：{good.text}</li>
                    })}
                </ul>

                {/* 添加商品 */}
                <div>
                    <input type="text"
                       value = {this.state.text}
                       onChange = {this.textChange}
                    />
                    <button onClick={this.addGood}>添加商品</button>
                </div>
            </div>
        )
    }
}
