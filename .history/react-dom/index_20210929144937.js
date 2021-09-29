/*
 * @Author: your name
 * @Date: 2021-09-29 14:09:11
 * @LastEditTime: 2021-09-29 14:49:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-parcel/react-dom/index.js
 */
const ReactDOM = {
  render,
};
function render() {
  return container.appendChild(_render(vnode));
}
function _render(vnode) {
  if (vnode === undefined) return;
  // 1 如果vnode是字符串
  if (typeof vnode === "string") {
    // 2 创建文本节点
    let textNode = document.createTextNode(vnode);
    return textNode;
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
