/*
 * @Author: your name
 * @Date: 2021-09-29 14:09:11
 * @LastEditTime: 2021-09-29 17:09:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-parcel/react-dom/index.js
 */
import createComponent from "./createComponent";
import {diff,diffNode} from './diff'
const ReactDOM = {
  render,
};
function render(vnode, container, dom) {
  // return container.appendChild(_render(vnode))
  // 修改为diff挂载
  return diff(dom, vnode, container);
}
function _render(vnode) {
  if (vnode === undefined || vnode === null || typeof vnode === "boolean")
    vnode = "";
  // 数值转字符串
  if (typeof vnode === "number") {
    vnode = String(vnode);
  }
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
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
  const { tag, attrs, childrens } = vnode;
  const dom = document.createElement(tag);
  if (attrs) {
    Object.keys(attrs).forEach((key) => {
      const value = attrs[key];
      setAttribute(dom, key, attrs[key]);
    });
  }

  if (childrens) {
    childrens.forEach((child) => {
      dom.appendChild(_render(child));
    });
  }

  return dom;
}

export function renderComponent(comp) {
  let base;
  const renderer = comp.render();

  // 更改
  // base = _render(renderer)
  base = diffNode(comp.base, renderer);
  if (comp.base && comp.componentWillUpdate) {
    comp.componentWillUpdate();
  }

  if (comp.base && comp.componentDidUpdate) {
    comp.componentDidUpdate();
  } else if (comp.componentDidMount) {
    comp.componentDidMount();
  }

  // 节点替换,在数据更新的时候
  // if (comp.base && comp.base.parentNode) {
  //   comp.base.parentNode.replaceChild(base, comp.base)
  // }
  comp.base = base;
}
export function setComponentProps(comp, props) {
  // 组件没有baseDOM
  if (!comp.base) {
    if (comp.componentWillMount) {
      comp.componentWillMount();
    }
  } else if (comp.componentWillReceiveProps) {
    comp.componentWillReceiveProps();
  }

  // 已经实例化，没有设置props，没有渲染
  comp.props = props;
  renderComponent(comp);
}
export function setAttribute(dom, key, value) {
  if (key === "className") {
    key = "class";
  }
  if (/on\w+/.test(key)) {
    key = key.toLowerCase();
    dom[key] = value || "";
  } else if (key === "style") {
    if (!value || typeof key === "string") {
      dom.style.cssText = value || "";
    } else if (value && typeof key === "object") {
      for (let k in value) {
        if (typeof value[k] === "number") {
          dom.style[k] = value[k] + "px";
        } else {
          dom.style[k] = value[k];
        }
      }
    }
  } else {
    if (key in dom) {
      dom[key] = value || "";
    }
    if (value) {
      dom.setAttribute(key, value);
    } else {
      dom.removeAttribute(key);
    }
  }
}

export default ReactDOM;
