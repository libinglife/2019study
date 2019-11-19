import React, { Component } from 'react'
import '../static/cartChild.css';

export default class CartChild extends Component {
    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <th>id</th>
                        <th>名字</th>
                        <th>数量</th>
                        <th>操作</th>
                    </tr>

                    {
                        this.props.data.map((good) => {
                            return (
                                <tr key={good.id}>
                                    <td>{good.id}</td>
                                    <td>{good.text}</td>
                                    <td>{good.count}</td>
                                    <td>
                                        <button onClick={() => { this.props.add(good, "minus") }}>-</button>
                                        <button onClick={() => { this.props.add(good, "add") }}>+</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        )
    }
}
