import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class UrlParams extends Component {
  constructor (props) {
    super(props);
    this.match = this.props.match;
  }
  render() {
    const Child = ({ match }) => (
      <div>
        <h3>ID: {match.params.id}</h3>
      </div>
    )
    return (
      <Router>
        <div>
          <h2>账号</h2>
          <ul>
            <li><Link to={`${this.match.url}/react-router`}>React Router</Link></li>
            <li><Link to={`${this.match.url}/leoashin`}>LeoAshin</Link></li>
            <li><Link to={`${this.match.url}/justjavac`}>justjavac</Link></li>
            <li><Link to={`${this.match.url}/reacttraining`}>React Training</Link></li>
          </ul>

          <Route path={`${this.match.url}/:id`} component={Child} />
        </div>
      </Router>
    );
  }
}

export default UrlParams;