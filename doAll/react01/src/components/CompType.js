import React  from 'react';

// 函数类型的组件
export function Welcome1(props) {
    return (<div>
        <h4>this is Welcome1</h4>
        <p>{props.name}</p>
    </div>)
}

// 基于类的组件
export class Welcome2 extends React.Component{
    render(){
        return (
            <div>
                <h4>这是 Welcome2</h4>
                <p>{this.props.name}</p>
            </div>
        )
    }
}
