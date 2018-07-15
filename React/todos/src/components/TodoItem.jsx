import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {
  render() {
    return (
      <li class="todos-item">
        <div class="checkbox">
            <input type="checkbox" id="'item-' + itemdata.id" />
            <label for="'item-' + itemdata.id" className="{complete: itemdata.ok, nocomplete: !itemdata.ok}" onClick="reOk()"></label>
        </div>
        <div class="todos-item-text">
            <div class="text" onDblclick="itemdata.edit=!itemdata.edit" v-show="!itemdata.edit" className="strickout">aaa</div>
            <input type="text" onBlur="itemBlur" />
        </div >
        <button class="shut" onClick="remove" >X</button >
      </li>
    );
  }
}

export default TodoItem;
