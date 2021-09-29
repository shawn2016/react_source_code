/*
 * @Author: your name
 * @Date: 2021-09-29 14:09:06
 * @LastEditTime: 2021-09-29 14:32:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-parcel/react/index.js
 */
const React = {
  createElement,
};

function createElement(tag, attrs, ...childrens) {
  return {
    tag,
    attrs,
    childrens,
  };
}

export default React;
