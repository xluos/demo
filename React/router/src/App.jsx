import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import Basic from './pages/basic';
import Home from './pages/home';
import UrlParams from './pages/url-params';
import Auth from './pages/auth';
import CustomLinkExample from './pages/custom-link';
import Prompt from './pages/prompt';
import NoMatch from './pages/404';
import Recursive from './pages/recursive';
import Animated from './pages/animated';


class App extends Component {
  render() {
    const routes = [
      { path: '/',
        exact: true,
        title: "Home",
        main: Home
      },
      { path: '/basic',
        title: "基本使用",
        main: Basic
      },
      { path: '/url-params',
        title: "URL传参",
        main: UrlParams
      },
      { path: '/auth',
        title: "认证",
        main: Auth
      },
      { path: '/custom-link',
        title: "自定义链接",
        main: CustomLinkExample
      },
      { path: '/prompt',
        title: "阻止导航",
        main: Prompt
      },
      { path: '/404',
        title: "404",
        main: NoMatch
      },
      { path: '/recursive',
        title: "递归组件",
        main: Recursive
      },
      { path: '/animated',
        title: "过渡动画",
        main: Animated
      },
    ]
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React-Router</h1>
        </header>
        <Router>
          <main>
            <nav>
              <ul className="nav">
              {routes.map((route,index)=>(
                <li key={index}>
                  <Link
                    to={route.path}>
                    {route.title}
                  </Link>
                </li>
              ))}
              </ul>
            </nav>
            <div className="page">
            <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
            </Switch>
            </div>
          </main>
        </Router>
      </div>
    );
  }
}

export default App;
