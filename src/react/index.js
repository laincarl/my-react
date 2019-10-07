
function createElement(type, props, ...children) {
  console.log(type, children)
  props.children = children;
  if (typeof type === 'function') {
    return type(props);
  }
  return {
    type,
    props
  }
}
export default {
  createElement
}