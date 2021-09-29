/*
 * @Author: your name
 * @Date: 2021-09-29 15:26:11
 * @LastEditTime: 2021-09-29 17:30:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-parcel/react/Component.js
 */
import { renderComponent } from "../react-dom";
export default class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
  }
  setState(stateChange) {
    console.log("11111111");
    Object.assign(this.state, stateChange);
    renderComponent(this);
    // enquenueSetState(stateChange, this);
  }
}

function defer(fn) {
  return Promise.resolve().then(fn);
}
/*
    1. 异步更新state,短时间把多个setState合并一个
    2. 一段时间之后，清空队列，渲染组件
  */
const setStateQueue = [];
// 保存当前的组件
const renderQueue = [];
function enquenueSetState(stateChange, component) {
  // 延迟调用
  if (setStateQueue.length === 0) {
    // defer(flush)
    setTimeout(() => {
      flush();
    }, 0);
  }

  // 1合并多个setState
  setStateQueue.push({
    stateChange,
    component,
  });

  // 如果renderQueue没有组件，添加至队列中
  let r = renderQueue.some((item) => {
    return item === component;
  });
  if (!r) {
    // 第一次添加
    renderQueue.push(component);
  }
}
// 一段时间之后
function flush() {
  let item, component;
  while ((item = setStateQueue.shift())) {
    const { stateChange, component } = item;

    // stateChange可能是数值，可能是函数
    // 保存之前的状态
    if (!component.prevState) {
      component.prevState = Object.assign({}, component.state);
    }

    if (typeof stateChange === "function") {
      // 是一个函数
      Object.assign(
        component.state,
        stateChange(component.prevState, component.props)
      );
    } else {
      // 是一个对象
      Object.assign(component.state, stateChange);
    }

    // prev
    component.prevState = component.state;
  }

  while ((component = renderQueue.shift())) {
    renderComponent(component);
  }
}
