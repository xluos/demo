import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.completeItem = this.completeItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.state = {
      edit: false
    }
  }
  completeItem() {
    this.props.onComplete(this.props.todo.id)
  }
  removeItem() {
    this.props.onRemoveItem(this.props.todo.id)
  }
  handleChange(e) {
    this.props.onEdit(this.props.todo.id,e.target.value)
  }
  render() {
    let todo = this.props.todo;
    return (
      <li className="todos-item">
        <div className="checkbox">
            <input type="checkbox" id={'item-' + todo.id} />
            <label htmlFor={'item-' + todo.id} className={todo.complete ? 'complete':'nocomplete'} onClick={this.completeItem}></label>
        </div>
        <div className="todos-item-text">
            <div 
              style={this.state.edit ? {display:"none"}:{}}
              onDoubleClick={()=>this.setState({edit:true})}
              className={'text ' + (todo.complete && 'strickout')}>{todo.title}</div>
            <input 
              style={!this.state.edit ? {display:"none"}:{}}
              value={todo.title}
              type="text"
              onBlur={()=>this.setState({edit:false})}
              onChange={this.handleChange}
              />
        </div >
        <button className="shut" onClick={this.removeItem} >X</button >
      </li>
    );
  }
}

export default TodoItem;
