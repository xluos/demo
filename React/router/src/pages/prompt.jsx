import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Prompt
} from 'react-router-dom'


class Promptb extends Component {
  constructor(props) {
    super(props);
    this.match = this.props.match;
  }
  render() {
    return (
      <Router>
        <div>
          <h2>阻止导航</h2>
          <ul>
            <li><Link to={`${this.match.url}/one`}>One</Link></li>
            <li><Link to={`${this.match.url}/two`}>Two</Link></li>
          </ul>
          <Route path={`${this.match.url}/`} exact render={() => <h3>Root</h3>} />
          <Route path={`${this.match.url}/one`} render={() => <h3>One</h3>} />
          <Route path={`${this.match.url}/two`} render={() => <h3>Two</h3>} />
          <Prompt
            when={true}
            message={location => (
              `Are you sure you want to go to ${location.pathname}`
            )}
          />
        </div>
      </Router>
    );
  }
}

export default Promptb;