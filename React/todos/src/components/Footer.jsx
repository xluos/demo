import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer class="todos-footer" v-show="todos.length">
        <div class="item-count">待办事项：
            <span>0</span>
        </div>
        <div class="btn-list">
            <button onClick="allPage" className={ "activation"}>全部</button>
            <button onClick="unfinishedPage" className="">未完成</button>
            <button onClick="completedPage" className="">已完成</button>
        </div>
        <button onClick="clearOk">清除已完成任务</button>
      </footer>
    );
  }
}

export default Footer;
