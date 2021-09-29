import React from "./react";
import ReactDOM from "./react-dom";
// 变量
// const app = (
//     <div className="active" title="123">
//       Hello,
//       <span>React1</span>
//     </div>
//   )

// 方法
// function App() {
//   return (
//     <div className="active" title="123">
//       Hello,
//       <span>React1</span>
//     </div>
//   );
// }

class Home extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        count: 0
      }
    }
    componentWillMount() {
      console.log('组件将要加载')
    }
    componentWillReceiveProps() {
      console.log('组件将要接受数据')
    }
    componentWillUpdate() {
      console.log('组件将要更新')
    }
    componentDidUpdate() {
      console.log('组件更新完成')
    }
    componentDidMount() {
      console.log('组件加载完成')

      componentDidMount() {
        console.log('组件加载完成')
        for(let i=0;i<10;i++){
          this.setState((prevState,prevProps)=>{
            console.log(prevState.count)
            return {
              count: prevState.count + 1
            }
          })
        }
      }
    }
    handleClick() {
      console.log('xx')
      // <button onClick={this.handleClick.bind(this)}>touch me</button>
      // 网页版不支持这样写
      // 先同步写，后续异步
      this.setState({
        count: this.state.count + 1
      })
    }
    render() {
      return (
        <div className="active" title="123">
          Hello,
          <span>React {this.state.count}</span>
          <button onClick={this.handleClick.bind(this)}>touch me</button>
        </div>
      )
    }
  }
// class Home extends React.Component{
//     render(){
//         return (
//             <div />
//         )
//     }
// }

ReactDOM.render(<Home name="panda" />, document.querySelector("#root"));
