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
    constructor(props){
        super(props)
    }
  render() {
    return (
      <div className="active" title="123">
        Hello,
        <span>React1</span>
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
