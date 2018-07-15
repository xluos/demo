import React, { Component } from 'react';
import './Head.css';

class Head extends Component {
  render() {
    return (
      <header class="todos-head">
        <input type="checkbox" id='all' />
        <label for="all" class="all" onClick="allOk"></label>
        <input type="text" placeholder="现在要做点儿什么？" />
      </header>
    );
  }
}

export default Head;
