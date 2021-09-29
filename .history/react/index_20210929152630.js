/*
 * @Author: your name
 * @Date: 2021-09-29 14:09:06
 * @LastEditTime: 2021-09-29 15:26:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-parcel/react/index.js
 */
import Component from './Component'
const React = {
  createElement,
  Component
};

function createElement(tag, attrs, ...childrens) {
  return {
    tag,
    attrs,
    childrens,
  };
}

export default React;
