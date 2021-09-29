/*
 * @Author: your name
 * @Date: 2021-09-29 17:02:27
 * @LastEditTime: 2021-09-29 17:08:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-parcel/react-dom/diff.js
 */
import createComponent from "./createComponent";
import { setComponentProps,setAttribute } from "./";
export function diff(dom, vnode, container) {
  // 对比节点的变化
  const ret = diffNode(dom, vnode);
  if (container) {
    container.appendChild(ret);
  }
  return ret;
}
export function diffNode(dom, vnode) {
  let out = dom;
  if (vnode === undefined || vnode === null || typeof vnode === "boolean")
    vnode = "";
  if (typeof vnode === "number") {
    vnode = String(vnode);
  }
  if (typeof vnode === "string") {
    if (dom && dom.nodeType === 3) {
      //
      if (dom.textContent !== vnode) {
        dom.textContent = vnode;
      }
    } else {
      // 其他节点替换文本节点
      out = document.createTextNode(vnode);
      if (dom && dom.parentNode) {
        dom.parentNode.replaceNode(out, dom);
      }
    }
    return out;
  }

  //
  if (typeof vnode.tag === "function") {
    return diffComponent(out, vnode);
  }
  // 非文本
  // 当前不存在dom节点
  if (!dom) {
    out = document.createElement(vnode.tag);
  }

  // 比较子节点（dom节点和组件）
  if (
    (vnode.childrens && vnode.childrens.length > 0) ||
    (out.childNodes && out.childNodes.length > 0)
  ) {
    // 对比子节点
    diffChildren(out, vnode.childrens);
  }

  diffAttribute(out, vnode);
  return out;
}

function diffComponent(dom, vnode) {
  let comp = dom;
  // 如果组件没有变化，重新设置props
  if (comp && comp.constructor === comp.tag) {
    // 重新设置props
    setComponentProps(comp, vnode.attrs);
    // 赋值
    dom = comp.base;
  } else {
    // 组件类型发生了变化
    if (comp) {
      // 先移除旧的组件
      unmountComponent(comp);
      comp = null;
    }

    // 1. 创建新的组件
    comp = createComponent(vnode.tag, vnode.attrs);
    //2. 设置组件属性
    setComponentProps(comp, vnode.attrs);
    // 3. 给当前挂载示例
    dom = comp.base;
  }
  return dom;
}
function unmountComponent(comp) {
  removeNode(comp.base);
}
function removeNode(dom) {
  if (dom && dom.parentNode) {
    dom.parentNode.removeNode(dom);
  }
}
// 对比子节点
function diffChildren(dom, vchildren) {
  const domChildren = dom.childNodes;
  const children = [];
  const keyed = {};
  // 将有key的节点(用对象保存)和没有key的节点(用数组保存)分开
  if (domChildren.length > 0) {
    [...domChildren].forEach((item) => {
      // 获取key
      const key = item.key;
      if (key) {
        // 如果key存在,保存到对象中
        keyed[key] = item;
      } else {
        // 如果key不存在,保存到数组中
        children.push(item);
      }
    });
  }
  if (vchildren && vchildren.length > 0) {
    let min = 0;
    let childrenLen = children.length; //2
    [...vchildren].forEach((vchild, i) => {
      // 获取虚拟DOM中所有的key
      const key = vchild.key;
      let child;
      if (key) {
        // 如果有key,找到对应key值的节点
        if (keyed[key]) {
          child = keyed[key];
          keyed[key] = undefined;
        }
      } else if (childrenLen > min) {
        // alert(1);
        // 如果没有key,则优先找类型相同的节点
        for (let j = min; j < childrenLen; j++) {
          let c = children[j];
          if (c) {
            child = c;
            children[j] = undefined;
            if (j === childrenLen - 1) childrenLen--;
            if (j === min) min++;
            break;
          }
        }
      }
      // 对比
      child = diffNode(child, vchild);
      // 更新DOM
      const f = domChildren[i];
      if (child && child !== dom && child !== f) {
        // 如果更新前的对应位置为空，说明此节点是新增的
        if (!f) {
          dom.appendChild(child);
          // 如果更新后的节点和更新前对应位置的下一个节点一样，说明当前位置的节点被移除了
        } else if (child === f.nextSibling) {
          removeNode(f);
          // 将更新后的节点移动到正确的位置
        } else {
          // 注意insertBefore的用法，第一个参数是要插入的节点，第二个参数是已存在的节点
          dom.insertBefore(child, f);
        }
      }
    });
  }
}

function diffAttribute(dom, vnode) {
  // 保存之前DOM所有属性
  const oldAttrs = {};
  // 写attrs
  const newAttrs = vnode.attrs;
  const domAttrs = dom.attributes;

  // 不知道浏览器babel怎么使用插件，所以使用Array.from
  Array.from(domAttrs).forEach((item) => {
    oldAttrs[item.name] = item.value;
  });

  // 原来的属性和新的属性对比，不在新的属性中，则移除掉（属性值为undefined）
  for (let key in oldAttrs) {
    if (!(key in newAttrs)) {
      setAttribute(dom, key, undefined);
    }
  }

  // 更新属性
  // class='active' abc
  for (let key in newAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      // 值不同，更新值
      setAttribute(dom, key, newAttrs[key]);
    }
  }
}
