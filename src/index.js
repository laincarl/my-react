import React from './react';
import ReactDOM from './react-dom';

function Comp({ name }) {
  return <span>{name}</span>
}
function App(params) {
  return <div>
    app
    <Comp name="text" />
  </div>
}
ReactDOM.render(<App />, document.getElementById('root'));
