import { initVDOM } from '../react-dom'
export default class Component {
  static isComponent = true;
  constructor(props) {
    this.props = props;
    this.state = {};
    this.$cache = {};
  }
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.forceRender()
  }
  forceRender() {
    const newvDOM = this.render();
    //生成新的dom元素
    const newNode = initVDOM(newvDOM);
    //更新自身元素
    this.$cache.node.parentNode.replaceChild(newNode, this.$cache.node);
    //更新缓存
    this.$cache.node = newNode;
  }
}