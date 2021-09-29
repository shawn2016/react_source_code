// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"react-dom/createComponent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createComponent;

var _Component = _interopRequireDefault(require("../react/Component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: your name
 * @Date: 2021-09-29 15:27:37
 * @LastEditTime: 2021-09-29 15:47:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-parcel/react-dom/createComponent.js
 */
// 创建组件，封装函数组件和类组件一样的class形式，然后返回实例，但是没有调用render方法，typeof class ===‘function’
function createComponent(comp, props) {
  var inst; // 判断类组件或者函数组件

  if (comp.prototype && comp.prototype.render) {
    inst = new comp(props);
  } else {
    // 函数组件扩展成类组件
    inst = new _Component.default(props);
    inst.constructor = comp;

    inst.render = function () {
      return this.constructor(props);
    };
  }

  return inst;
}
},{"../react/Component":"react/Component.js"}],"react-dom/diff.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diff = diff;
exports.diffNode = diffNode;

var _createComponent = _interopRequireDefault(require("./createComponent"));

var _ = require("./");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function diff(dom, vnode, container) {
  // 对比节点的变化
  var ret = diffNode(dom, vnode);

  if (container) {
    container.appendChild(ret);
  }

  return ret;
}

function diffNode(dom, vnode) {
  var out = dom;
  if (vnode === undefined || vnode === null || typeof vnode === "boolean") vnode = "";

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
  } //


  if (typeof vnode.tag === "function") {
    return diffComponent(out, vnode);
  } // 非文本
  // 当前不存在dom节点


  if (!dom) {
    out = document.createElement(vnode.tag);
  } // 比较子节点（dom节点和组件）


  if (vnode.childrens && vnode.childrens.length > 0 || out.childNodes && out.childNodes.length > 0) {
    // 对比子节点
    diffChildren(out, vnode.childrens);
  }

  diffAttribute(out, vnode);
  return out;
}

function diffComponent(dom, vnode) {
  var comp = dom; // 如果组件没有变化，重新设置props

  if (comp && comp.constructor === comp.tag) {
    // 重新设置props
    (0, _.setComponentProps)(comp, vnode.attrs); // 赋值

    dom = comp.base;
  } else {
    // 组件类型发生了变化
    if (comp) {
      // 先移除旧的组件
      unmountComponent(comp);
      comp = null;
    } // 1. 创建新的组件


    comp = (0, _createComponent.default)(vnode.tag, vnode.attrs); //2. 设置组件属性

    (0, _.setComponentProps)(comp, vnode.attrs); // 3. 给当前挂载示例

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
} // 对比子节点


function diffChildren(dom, vchildren) {
  var domChildren = dom.childNodes;
  var children = [];
  var keyed = {}; // 将有key的节点(用对象保存)和没有key的节点(用数组保存)分开

  if (domChildren.length > 0) {
    _toConsumableArray(domChildren).forEach(function (item) {
      // 获取key
      var key = item.key;

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
    var min = 0;
    var childrenLen = children.length; //2

    _toConsumableArray(vchildren).forEach(function (vchild, i) {
      // 获取虚拟DOM中所有的key
      var key = vchild.key;
      var child;

      if (key) {
        // 如果有key,找到对应key值的节点
        if (keyed[key]) {
          child = keyed[key];
          keyed[key] = undefined;
        }
      } else if (childrenLen > min) {
        // alert(1);
        // 如果没有key,则优先找类型相同的节点
        for (var j = min; j < childrenLen; j++) {
          var c = children[j];

          if (c) {
            child = c;
            children[j] = undefined;
            if (j === childrenLen - 1) childrenLen--;
            if (j === min) min++;
            break;
          }
        }
      } // 对比


      child = diffNode(child, vchild); // 更新DOM

      var f = domChildren[i];

      if (child && child !== dom && child !== f) {
        // 如果更新前的对应位置为空，说明此节点是新增的
        if (!f) {
          dom.appendChild(child); // 如果更新后的节点和更新前对应位置的下一个节点一样，说明当前位置的节点被移除了
        } else if (child === f.nextSibling) {
          removeNode(f); // 将更新后的节点移动到正确的位置
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
  var oldAttrs = {}; // 写attrs

  var newAttrs = vnode.attrs;
  var domAttrs = dom.attributes; // 不知道浏览器babel怎么使用插件，所以使用Array.from

  Array.from(domAttrs).forEach(function (item) {
    oldAttrs[item.name] = item.value;
  }); // 原来的属性和新的属性对比，不在新的属性中，则移除掉（属性值为undefined）

  for (var key in oldAttrs) {
    if (!(key in newAttrs)) {
      (0, _.setAttribute)(dom, key, undefined);
    }
  } // 更新属性
  // class='active' abc


  for (var _key in newAttrs) {
    if (oldAttrs[_key] !== newAttrs[_key]) {
      // 值不同，更新值
      (0, _.setAttribute)(dom, _key, newAttrs[_key]);
    }
  }
}
},{"./createComponent":"react-dom/createComponent.js","./":"react-dom/index.js"}],"react-dom/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderComponent = renderComponent;
exports.setComponentProps = setComponentProps;
exports.setAttribute = setAttribute;
exports.default = void 0;

var _createComponent = _interopRequireDefault(require("./createComponent"));

var _diff = require("./diff");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ReactDOM = {
  render: render
};

function render(vnode, container, dom) {
  // return container.appendChild(_render(vnode))
  // 修改为diff挂载
  return (0, _diff.diff)(dom, vnode, container);
}

function _render(vnode) {
  if (vnode === undefined || vnode === null || typeof vnode === "boolean") vnode = ""; // 数值转字符串

  if (typeof vnode === "number") {
    vnode = String(vnode);
  }

  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  } // 如果tag是函数，渲染组件


  if (typeof vnode.tag === "function") {
    // 1.创建组件
    var comp = (0, _createComponent.default)(vnode.tag, vnode.attrs); // 2.设置组件的属性

    setComponentProps(comp, vnode.attrs); // 3.组件渲染的节点对象返回

    return comp.base;
  }

  var _vnode = vnode,
      tag = _vnode.tag,
      attrs = _vnode.attrs,
      childrens = _vnode.childrens;
  var dom = document.createElement(tag);

  if (attrs) {
    Object.keys(attrs).forEach(function (key) {
      var value = attrs[key];
      setAttribute(dom, key, attrs[key]);
    });
  }

  if (childrens) {
    childrens.forEach(function (child) {
      dom.appendChild(_render(child));
    });
  }

  return dom;
}

function renderComponent(comp) {
  var base;
  var renderer = comp.render(); // 更改
  // base = _render(renderer)

  base = (0, _diff.diffNode)(comp.base, renderer);

  if (comp.base && comp.componentWillUpdate) {
    comp.componentWillUpdate();
  }

  if (comp.base && comp.componentDidUpdate) {
    comp.componentDidUpdate();
  } else if (comp.componentDidMount) {
    comp.componentDidMount();
  } // 节点替换,在数据更新的时候
  // if (comp.base && comp.base.parentNode) {
  //   comp.base.parentNode.replaceChild(base, comp.base)
  // }


  comp.base = base;
}

function setComponentProps(comp, props) {
  // 组件没有baseDOM
  if (!comp.base) {
    if (comp.componentWillMount) {
      comp.componentWillMount();
    }
  } else if (comp.componentWillReceiveProps) {
    comp.componentWillReceiveProps();
  } // 已经实例化，没有设置props，没有渲染


  comp.props = props;
  renderComponent(comp);
}

function setAttribute(dom, key, value) {
  if (key === "className") {
    key = "class";
  }

  if (/on\w+/.test(key)) {
    key = key.toLowerCase();
    dom[key] = value || "";
  } else if (key === "style") {
    if (!value || typeof key === "string") {
      dom.style.cssText = value || "";
    } else if (value && _typeof(key) === "object") {
      for (var k in value) {
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

var _default = ReactDOM;
exports.default = _default;
},{"./createComponent":"react-dom/createComponent.js","./diff":"react-dom/diff.js"}],"react/Component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactDom = require("../react-dom");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Component =
/*#__PURE__*/
function () {
  function Component() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Component);

    this.props = props;
    this.state = {};
  }

  _createClass(Component, [{
    key: "setState",
    value: function setState(stateChange) {
      // console.log("11111111");
      // Object.assign(this.state, stateChange);
      // renderComponent(this);
      enquenueSetState(stateChange, this);
    }
  }]);

  return Component;
}();

exports.default = Component;

function defer(fn) {
  return Promise.resolve().then(fn);
}
/*
    1. 异步更新state,短时间把多个setState合并一个
    2. 一段时间之后，清空队列，渲染组件
  */


var setStateQueue = []; // 保存当前的组件

var renderQueue = [];

function enquenueSetState(stateChange, component) {
  // 延迟调用
  if (setStateQueue.length === 0) {
    // defer(flush)
    setTimeout(function () {
      flush();
    }, 0);
  } // 1合并多个setState


  setStateQueue.push({
    stateChange: stateChange,
    component: component
  }); // 如果renderQueue没有组件，添加至队列中

  var r = renderQueue.some(function (item) {
    return item === component;
  });

  if (!r) {
    // 第一次添加
    renderQueue.push(component);
  }
} // 一段时间之后


function flush() {
  var item, component;

  while (item = setStateQueue.shift()) {
    var _item = item,
        stateChange = _item.stateChange,
        _component = _item.component; // stateChange可能是数值，可能是函数
    // 保存之前的状态

    if (!_component.prevState) {
      _component.prevState = Object.assign({}, _component.state);
    }

    if (typeof stateChange === "function") {
      // 是一个函数
      Object.assign(_component.state, stateChange(_component.prevState, _component.props));
    } else {
      // 是一个对象
      Object.assign(_component.state, stateChange);
    } // prev


    _component.prevState = _component.state;
  }

  while (component = renderQueue.shift()) {
    (0, _reactDom.renderComponent)(component);
  }
}
},{"../react-dom":"react-dom/index.js"}],"react/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component = _interopRequireDefault(require("./Component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: your name
 * @Date: 2021-09-29 14:09:06
 * @LastEditTime: 2021-09-29 17:07:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-parcel/react/index.js
 */
var React = {
  createElement: createElement,
  Component: _Component.default
};

function createElement(tag, attrs) {
  for (var _len = arguments.length, childrens = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    childrens[_key - 2] = arguments[_key];
  }

  return {
    tag: tag,
    attrs: attrs,
    childrens: childrens,
    key: attrs && attrs.key || null
  };
}

var _default = React;
exports.default = _default;
},{"./Component":"react/Component.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _react = _interopRequireDefault(require("./react"));

var _reactDom = _interopRequireDefault(require("./react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
var Home =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Home, _React$Component);

  var _super = _createSuper(Home);

  function Home(props) {
    var _this;

    _classCallCheck(this, Home);

    _this = _super.call(this, props);
    _this.state = {
      count: 0
    };
    return _this;
  }

  _createClass(Home, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      console.log("组件将要加载");
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {
      console.log("组件将要接受数据");
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate() {
      console.log("组件将要更新");
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      console.log("组件更新完成");
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log("组件加载完成");
      console.log("组件加载完成");

      for (var i = 0; i < 10; i++) {
        this.setState(function (prevState, prevProps) {
          console.log(prevState.count);
          return {
            count: prevState.count + 1
          };
        });
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick() {
      console.log("xx"); // <button onClick={this.handleClick.bind(this)}>touch me</button>
      // 网页版不支持这样写
      // 先同步写，后续异步

      this.setState({
        count: this.state.count + 1
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "active",
        title: "123"
      }, "Hello,", _react.default.createElement("span", null, "React ", this.state.count), _react.default.createElement("button", {
        onClick: this.handleClick.bind(this)
      }, "touch me"));
    }
  }]);

  return Home;
}(_react.default.Component); // class Home extends React.Component{
//     render(){
//         return (
//             <div />
//         )
//     }
// }


_reactDom.default.render(_react.default.createElement(Home, {
  name: "panda"
}), document.querySelector("#root"));
},{"./react":"react/index.js","./react-dom":"react-dom/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61576" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/react-parcel.e31bb0bc.js.map