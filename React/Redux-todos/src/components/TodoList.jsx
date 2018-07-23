import React, { Component } from 'react';
import './TodoList.css';
import TodoItem from './TodoItem'

class TodoList extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ul className="todos-list">
        {
          this.props.list.map((item)=>(<TodoItem todo={item} />))
        }
      </ul>
    );
  }
}

export default TodoList;
