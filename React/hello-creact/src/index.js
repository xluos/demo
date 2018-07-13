import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Header from './components/Header';
import Footer from './components/Footer';
import registerServiceWorker from './registerServiceWorker';


var list = ["asd", "qwe", "123", "zxc", "zxc"]
ReactDOM.render(
    <div>
    <Header />
    <App list={list}>
        <p>I am child</p>
    </App>
    <Footer />
    <button>点我</button>
    </div>,
    document.getElementById('root')
);
registerServiceWorker();
