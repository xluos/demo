import React, { Component } from 'react';
import './App.css';
import Head from './Head';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Head />
        <TodoList />
        <Footer />
      </div>
    );
  }
}

export default App;
