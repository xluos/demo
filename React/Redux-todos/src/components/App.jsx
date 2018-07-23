import React, { Component } from 'react';
import './App.css';
import Head from './Head';
import Footer from './Footer';
import TodoItem from './TodoItem'
import store from 'storejs';

class App extends Component {
  constructor(props) {
    super(props);
    this.addTodo = this.addTodo.bind(this);
    this.complete = this.complete.bind(this);
    this.remove = this.remove.bind(this);
    this.editItemTitle = this.editItemTitle.bind(this);
    this.setPage = this.setPage.bind(this);
    this.clearComplete = this.clearComplete.bind(this);
    this.allComplete = this.allComplete.bind(this);
    this.state = store.has('todolist') ? store() : { todolist: [], page: 0 };
    
  }
  uuid() {
    /*jshint bitwise:false */
    var i, random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
        .toString(16);
    }

    return uuid;
  }
  addTodo(val) {
    const todo = {
      id: this.uuid(),
      title: val,
      complete: false
    };
    this.state.todolist.unshift(todo);
    this.setState({});
    // this.setState({
    //   todolist: [todo, ...this.state.todolist]
    // })
    store(this.state);
  }
  complete(itemUuid) {
    let list = this.state.todolist;
    let index = list.findIndex((item) => (item.id === itemUuid));
    list[index].complete = !list[index].complete;
    this.setState({});
    store(this.state);
  }
  remove(itemUuid) {
    let list = this.state.todolist;
    let index = list.findIndex((item) => (item.id === itemUuid));
    list.splice(index, 1);
    this.setState({});
    store(this.state);
  }
  editItemTitle(itemUuid, value) {
    let list = this.state.todolist;
    let index = list.findIndex((item) => (item.id === itemUuid));
    list[index].title = value;
    this.setState({});
    store(this.state);
  }
  setPage(id) {
    this.setState({
      page: id
    })
    store(this.state);
  }
  clearComplete() {
    this.setState({
      todolist: this.state.todolist.filter((item) => !item.complete)
    })
    store(this.state);
  }
  allComplete() {
    this.setState({
      todolist: this.state.todolist.map((item) => {item.complete = true; return item;})
    })
    store(this.state);
  }
  getCount(list) {
    let count = 0;
    for (let i = list.length - 1; i >= 0; i--) {
      if (!list[i].complete) {
        count++;
      }
    }
    return count;
  }
  render() {
    let todolist;
    switch (this.state.page) {
      case 0:
        todolist = this.state.todolist;
        break;
      case 1:
        todolist = this.state.todolist.filter((todo) => todo.complete);
        break;
      case 2:
        todolist = this.state.todolist.filter((todo) => !todo.complete);
        break;
      default:
    }
    return (
      <div className="App">
        <Head 
          onAddTodo={this.addTodo}
          onAllComplete={this.allComplete}
          isItem={todolist.length > 0} />
        {this.state.todolist.length > 0 && (
          <div>
            <ul className="todos-list">
              {
                todolist
                  .map((item) => (
                    <TodoItem
                      key={item.id}
                      todo={item}
                      onComplete={this.complete}
                      onRemoveItem={this.remove}
                      onEdit={this.editItemTitle}
                    />))
              }
            </ul>
            <Footer
              count={this.getCount(this.state.todolist)}
              page={this.state.page}
              onSetPage={this.setPage}
              onClearComplete={this.clearComplete}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
