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
    <div className="active" title="123">
      Hello,
      <span>React1</span>
    </div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
