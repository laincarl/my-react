import { initVDOM } from '../react-dom'

export const schedule = {
  queue: [],
  updating: false,
  addUpdater(updater) {
    this.queue.push(updater)
  },
  doUpdate() {
    if (!this.updating) {
      this.updating = true;
      let updater;
      while (updater = this.queue.pop()) {
        updater.updateComponent()
      }
      this.updating = false;
    }
  }
}
class Updater {
  constructor(component) {
    this.component = component;
    this.statesQueue = [];
    this.updating = false;

  }
  emitUpdate(nextProps) {
    console.log(schedule.updating)
    // 如果还在收集state，就不更新。
    if (nextProps || !schedule.updating) {
      this.updateComponent();
    } else {
      schedule.addUpdater(this)
    }
  }
  addState(nextState) {
    if (nextState) {
      this.statesQueue.push(nextState)
      if (!this.updating) {
        this.emitUpdate()
      }
    }
  }
  updateComponent() {
    this.component.forceRender()
  }
}
export default class Component {
  static isComponent = true;
  constructor(props) {
    this.props = props;
    this.state = {};
    this.$cache = {};
    this.$updater = new Updater(this)
  }
  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.$updater.addState(nextState);
    // this.forceRender()
  }
  forceRender() {
    const newvDOM = this.render();
    console.log(this.$cache.vDOM)

    //生成新的dom元素
    const newNode = initVDOM(newvDOM);
    //更新自身元素
    this.$cache.node.parentNode.replaceChild(newNode, this.$cache.node);
    //更新缓存
    this.$cache.vDOM = newvDOM;
    this.$cache.node = newNode;
  }
}
function diff() {

}