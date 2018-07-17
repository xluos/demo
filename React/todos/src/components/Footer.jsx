import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {

  render() {
    return (
      <footer className="todos-footer" v-show="todos.length">
        <div className="item-count">待办事项：
            <span>{this.props.count}</span>
        </div>
        <div className="btn-list">
            <button onClick={()=>this.props.onSetPage(0)} className={this.props.page === 0 ? "activation":""}>全部</button>
            <button onClick={()=>this.props.onSetPage(1)} className={this.props.page === 1 ? "activation":""}>未完成</button>
            <button onClick={()=>this.props.onSetPage(2)} className={this.props.page === 2 ? "activation":""}>已完成</button>
        </div>
        <button onClick={this.props.onClearComplete}>清除已完成任务</button>
      </footer>
    );
  }
}

export default Footer;
