/*
 * @Author: your name
 * @Date: 2021-09-29 15:27:37
 * @LastEditTime: 2021-09-29 15:44:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-parcel/react-dom/createComponent.js
 */
import Component from '../react/Component'
 // 创建组件，封装函数组件和类组件一样的class形式，然后返回实例，但是没有调用render方法，typeof class ===‘function’
 export default function createComponent(comp,props){
    let inst
    // 判断类组件或者函数组件
    if(comp.prototype && comp.prototype.render){
      inst = new comp(props)
      console.log(inst,'1111111111111')
  }else{
      // 函数组件扩展成类组件
      inst = new Component(props)
      inst.constructor = comp
      inst.render = function(){
        return this.constructor(props)
      }
    }
    return inst
  }
