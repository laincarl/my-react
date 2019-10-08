import { VTEXT, VELEMENT, VSTATELESS, VCOMPONENT } from '../react/constant'

function render(vDom, dom) {
  const node = initVDOM(vDom);
  console.log(vDom, node);
  dom.appendChild(node);
}

/**
 *
 *
 * @param {*} vNode 
 * @returns realDom 最终返回真实dom,递归
 */
export function initVDOM(vNode) {
  const { vType } = vNode; 
  if (!vType) {
    // 文本节点
    return document.createTextNode(vNode);
  }
  if (vType === VCOMPONENT) {
    return initVComponent(vNode)
  } else if (vType === VSTATELESS) {
    return initVFunction(vNode)
  } else if (vType === VELEMENT) {
    return initVNode(vNode)
  }
}
function initVComponent(vNode) {
  const { props, type } = vNode;
  const component = new type(props);
  const { $cache: cache } = component;
  const vDOM = component.render();
  const node = initVDOM(vDOM);
  cache.node = node;
  return node;
}
function initVFunction(vNode) {
  const { props, type } = vNode;
  return initVDOM(type(props));
}
function initVNode(vNode) {
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode)
  }
  const { type, props } = vNode;
  const { children, style, className, ...restProps } = props;
  const node = document.createElement(type);
  console.log(restProps)
  Object.keys(restProps).forEach(attr => {
    const value = restProps[attr];
    if (attr.startsWith('on')) {
      node[attr.toLowerCase()] = value
    } else {
      node.setAttribute(attr, restProps[attr])
    }
  })
  children.forEach(child => {
    // console.log(child)
    node.appendChild(initVDOM(child))
  });
  return node
}

export default {
  render
}