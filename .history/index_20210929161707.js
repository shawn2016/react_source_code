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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
    };
  }
  componentWillMount() {
    console.log("组件将要加载");
  }
  componentWillReceiveProps() {
    console.log("组件将要接受数据");
  }
  componentWillUpdate() {
    console.log("组件将要更新");
  }
  componentDidUpdate() {
    console.log("组件更新完成");
  }
  componentDidMount() {
    console.log("组件加载完成");
  }
  handleClick() {
    this.setState({
      num: this.state.num + 1,
    });
  }
  render() {
    return (
      <div className="active" title="123">
        Hello,
        <span>React1</span>
        {this.state.num}
        <button onClick={this.handleClick.bind(this)}>点击</button>
      </div>
    );
  }
}

// class Home extends React.Component{
//     render(){
//         return (
//             <div />
//         )
//     }
// }

ReactDOM.render(<App name="panda" />, document.querySelector("#root"));
