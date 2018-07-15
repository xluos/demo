import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Event from './components/Event.jsx';
import registerServiceWorker from './registerServiceWorker';


var list = ["asd", "qwe", "123", "zxc", "zxc"]
ReactDOM.render(
    <div>
        <Header title="Hello"/>
        <App list={list}>
            <p>I am child</p>
            <p>I am child2</p>
        </App>
        <Event num={0} />
        <Footer />
    </div>,
    document.getElementById('root')
);
registerServiceWorker();
