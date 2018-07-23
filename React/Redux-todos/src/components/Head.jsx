import React, { Component } from 'react';
import './Head.css';
import trim from 'trim';

class Head extends Component {
  constructor(props) {
    super(props);
    this.EnterDown = this.EnterDown.bind(this);
  }
  EnterDown(e) {
    if(e.keyCode === 13) {
      let todoTitle = trim(e.target.value);
      if(todoTitle.length > 0) {
        this.props.onAddTodo(todoTitle)
      }
      e.target.value = '';
    }
  }
  render() {
    const isItem = this.props.isItem
    return (
      <header className="todos-head">
        { isItem && <input type="checkbox" id='all' /> }
        { isItem && <label htmlFor="all" className="all" onClick={()=>this.props.onAllComplete()}></label> }
        <input onKeyUp={this.EnterDown} type="text" placeholder="现在要做点儿什么？" />
      </header>
    );
  }
}

export default Head;
