import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <h2>Home Page</h2>
    );
  }
}
class About extends Component {
  render() {
    return (
      <h2>About Page</h2>
    );
  }
}
class Topics extends Component {
  constructor (props) {
    super(props);
    this.match = this.props.match;
  }
  render() {
    const Topic = ({ match }) => (
      <div>
        <h3>{match.params.topicId}</h3>
      </div>
    )
    return (
      <div>
        <h2>主题列表</h2>
        <ul>
          <li>
            <Link to={`${this.match.url}/rendering`}>
              使用 React 渲染
            </Link>
          </li>
          <li>
            <Link to={`${this.match.url}/components`}>
              组件
            </Link>
          </li>
          <li>
            <Link to={`${this.match.url}/props-v-state`}>
              属性 v. 状态
            </Link>
          </li>
        </ul>
        <Route path={`${this.match.url}/:topicId`} component={Topic} />
        <Route exact path={this.match.url} render={() => (
          <h3>请选择一个主题。</h3>
        )} />
      </div>
    );
  }
}

class Basic extends Component {
  constructor (props) {
    super(props);
    this.match = this.props.match;
  }
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to={`${this.match.url}/`}>首页</Link></li>
            <li><Link to={`${this.match.url}/about`}>关于</Link></li>
            <li><Link to={`${this.match.url}/topics`}>主题列表</Link></li>
          </ul>

          <hr />

          <Route exact path={`${this.match.url}/`} component={Home} />
          <Route path={`${this.match.url}/about`} component={About} />
          <Route path={`${this.match.url}/topics`} component={Topics} />
        </div>
      </Router>
    );
  }
}

export default Basic;