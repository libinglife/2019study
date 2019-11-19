import React, { Component } from 'react'
import CartChild from './CartChild';

export default class CartSample extends Component {

    // 状态初始化，一般放在构造器中
    constructor(props) {
        super(props);

        this.state ={
            goods: [
                { id: 1, text: "web全栈架构师" ,count:1 },
                { id: 2, text: "java架构师", count: 1},
            ],
            text:'',
            cart:[],
           
        }
        this.addGood = this.addGood.bind(this);
    }

    // 内容改变
    textChange = (e) => {
        // console.log(e.target.value);
        this.setState({
            text: e.target.value
        })
    }
    // 添加商品列表
    addGood() {
        if (this.state.text === "") {
            alert("请填写内容");
            return;
        }
        this.setState(prevState => {
            return {
                goods: [
                    ...prevState.goods,
                    {
                        id: prevState.goods.length + 1,
                        text: prevState.text,
                        count:1
                    }
                ]
            }
        })
    }

    //添加到购物车
    addToCart = (good)=>{
        // const arr = [{
        //     id: "01",
        //     name: '李兵'
        // }, {
        //     id: "02",
        //     name: 'libing'
        // }]

        // let index = arr.findIndex((item,index,thatArr)=>{
        //     return item.id ==="fsf"
        // })
        // // findIndex  找不到返回-1
        // //find 找不到返回 undefined
        // console.log(index);
    
        // return

        // 创建新的购物车
        const newCart = [...this.state.cart];
        const indexId = this.state.cart.findIndex((item)=>{
            return item.id === good.id;
        });
        // const item  = newCart[indexId]

        const itemGood = this.state.cart.find((item) => {
            return item.id === good.id;
        });
        if (itemGood){ //判断是已存在商品，直接增加数量
            // newCart[indexId].count++
            itemGood.count++;
            newCart.splice(indexId,1,itemGood)
        }else{
            newCart.push(good);
        }
        this.setState({
            cart: newCart
        })
    }

    // 增加数量 
    add= (good,flag)=>{
        //创建新的购物车
        const newCart = [...this.state.cart];
        const indexId = this.state.cart.findIndex(item=>{
            return item.id === good.id;
        })
        const itemGood = newCart[indexId];
        if(itemGood){
            if(flag==="add"){
                itemGood.count++;
                newCart.splice(indexId, 1, itemGood)
            }else if(flag==="minus"){
                itemGood.count--;
                if(itemGood.count===0){
                    newCart.splice(indexId, 1)
                }else{
                    newCart.splice(indexId, 1, itemGood)
                }
            }
        }
        this.setState({
            cart:newCart
        })
    }

    render() {
        return (
            <div className="cartSample">
                {/* 条件渲染 */}
                {this.props.title && <h1>{this.props.title}</h1>}

                {/* 列表渲染 */}
                <ul>
                    {this.state.goods.map((good) => {
                        return (<li key={good.id}>
                            {good.id}号：{good.text}
                            <button onClick={() => { this.addToCart(good) }}>加入购物车</button>
                        </li>)
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

                {/* 购物车 */}
                <CartChild data={this.state.cart} add={this.add} minus={this.minus}></CartChild>
            </div>
        )
    }
}
