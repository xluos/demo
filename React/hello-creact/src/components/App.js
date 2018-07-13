import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>APP</h2>
        <div>content</div>
        <h2>LIST</h2>
        <ul>
          { this.props.list.map((text,index)=><li key={index}>{text}</li>)}
        </ul>
        { this.props.children }
      </div>
    );
  }
}

export default App;
