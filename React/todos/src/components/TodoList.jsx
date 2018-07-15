import React, { Component } from 'react';
import './TodoList.css';
import TodoItem from './TodoItem'

class TodoList extends Component {
  render() {
    return (
      <ul className="todos-list">
          <TodoItem />
      </ul>
    );
  }
}

export default TodoList;
