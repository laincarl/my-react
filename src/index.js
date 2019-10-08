import React, { Component } from './react';
import ReactDOM from './react-dom';

class ClassComponent extends Component {
  state = {
    text: 'ss'
  }
  handleClick = () => {
    console.log('click');
    this.setState({
      text: Math.random()
    })
  }
  render() {
    const { name } = this.props;
    const { text } = this.state;
    return <div>
      {name}
      <div>
        {text}
      </div>
      <button onClick={this.handleClick}>update</button>
    </div>
  }
}
function Comp({ name }) {
  return <div data-id="Comp">{name}</div>
}
function App() {
  return (
    <div>
      <div>textNode</div>
      <Comp name="function" />
      <ClassComponent name="class" />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'));
