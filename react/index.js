/*
 * @Author: your name
 * @Date: 2021-09-29 14:09:06
 * @LastEditTime: 2021-09-29 17:07:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-parcel/react/index.js
 */
import Component from "./Component";
const React = {
  createElement,
  Component,
};

function createElement(tag, attrs, ...childrens) {
  return {
    tag,
    attrs,
    childrens,
    key: (attrs && attrs.key) || null,
  };
}

export default React;
