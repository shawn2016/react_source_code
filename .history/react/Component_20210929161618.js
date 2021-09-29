/*
 * @Author: your name
 * @Date: 2021-09-29 15:26:11
 * @LastEditTime: 2021-09-29 16:16:18
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
  setState(changeObj) {
    console.log("11111111");
    Object.assign(this.state, changeObj);
    renderComponent(this);
  }
}
