import Component from './Component';
import { VTEXT, VELEMENT, VSTATELESS, VCOMPONENT } from './constant'

function ReactElement(type, props) {
  // console.log(type)
  let vType = null;
  if (typeof type === 'string') {
    vType = VELEMENT;
  } else if (typeof type === 'function') {
    if (type.isComponent) {
      vType = VCOMPONENT
    } else {
      vType = VSTATELESS
    }
  }
  return {
    vType,
    type,
    props
  };
}

function createElement(type, props, ...children) {
  // console.log(type, children)
  props.children = children;
  delete props.__self;
  delete props.__source;
  return ReactElement(
    type,
    props
  )
}
export default {
  createElement
}
export { Component };