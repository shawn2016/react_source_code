/*
 * @Author: your name
 * @Date: 2021-09-29 14:09:11
 * @LastEditTime: 2021-09-29 15:55:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-parcel/react-dom/index.js
 */
import createComponent from "./createComponent";
const ReactDOM = {
  render,
};
function render(vnode, container) {
  return container.appendChild(_render(vnode));
}

// 设置组件实例的属性
function setComponentProps(comp, props) {
  // 组件没有baseDOM
  if (!comp.base) {
    //   第一次加载组件时
    if (comp.componentWillMount) {
      comp.componentWillMount();
    }
  } else if (comp.componentWillReceiveProps) {
    //   修改组件属性时
    comp.componentWillReceiveProps();
  }
  comp.props = props;
  renderComponent(comp);
}
// 设置完成props，调用组件实例的render方法返回jsx，使用_render渲染jsx
function renderComponent(comp) {
  let base;
  const renderer = comp.render();
  base = _render(renderer);
  if (comp.base && comp.componentWillUpdate) {
    comp.componentWillUpdate();
  }

  if (comp.base && comp.componentDidUpdate) {
    comp.componentDidUpdate();
  } else if (comp.componentDidMount) {
    comp.componentDidMount();
  }

  // 节点替换,在数据更新的时候
  if (comp.base && comp.base.parentNode) {
    comp.base.parentNode.replaceChild(base, comp.base);
  }
  comp.base = base;
}
function _render(vnode) {
  console.log(vnode);
  if (vnode === undefined || vnode === null || typeof vnode === "boolean")
    vnode = "";
  // 1 如果vnode是字符串
  if (typeof vnode === "string") {
    // 2 创建文本节点
    let textNode = document.createTextNode(vnode);
    return textNode;
  }

  // 如果tag是函数，渲染组件
  if (typeof vnode.tag === "function") {
    // 1.创建组件
    const comp = createComponent(vnode.tag, vnode.attrs);
    // 2.设置组件的属性
    setComponentProps(comp, vnode.attrs);
    // 3.组件渲染的节点对象返回
    return comp.base;
  }

  // 3 虚拟DOM对象
  const { tag, attrs, childrens } = vnode;
  const dom = document.createElement(tag);
  if (attrs) {
    Object.keys(attrs).forEach((key) => {
      // 4 设置属性
      setAttribute(dom, key, attrs[key]);
    });
  }

  // 5 渲染子节点,直接调用render
  childrens.forEach((child) => render(child, dom));

  return dom;
}

function setAttribute(dom, key, value) {
  // className转换成class
  if (key === "className") {
    key = "class";
  }

  // event
  //  正在匹配事件 onClick  onChange
  if (/on\w+/.test(key)) {
    key = key.toLowerCase();
    dom[key] = value || "";
    // 处理style 可以是字符串  也可以是对象  style="color:red"  style={{color:red}}
  } else if (key === "style") {
    // style 可以是字符串也可以是对象
    if (!value || typeof key === "string") {
      dom.style.cssText = value || "";
    } else if (value && typeof value === "object") {
      // {width:200}
      for (let k in value) {
        if (typeof value[k] === "number") {
          dom.style[k] = value[k] + "px";
        } else {
          dom.style[k] = value[k];
        }
      }
    }
  } else {
    // 其他属性
    if (key in dom) {
      dom[key] = value || "";
    }
    if (value) {
      dom.setAttribute(key, value);
    } else {
      dom.removeAttribute(key);
    }
  }

  dom.setAttribute(key, value);
}

export default ReactDOM;
