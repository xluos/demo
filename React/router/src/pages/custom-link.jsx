import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About2 = () => (
  <div>
    <h2>About</h2>
  </div>
)


class CustomLinkExample extends Component {
  constructor (props) {
    super(props);
    this.match = this.props.match;
  }
  render() {
    return (
      <Router>
        <div>
          <ul>
            <OldSchoolMenuLink activeOnlyWhenExact={true} to={`${this.match.url}/`} label="Home" />
            <OldSchoolMenuLink to={`${this.match.url}/about`} label="About" />
          </ul>
          <hr/>
          <Route exact path={`${this.match.url}/`} component={Home} />
          <Route path={`${this.match.url}/about`} component={About2} />
        </div>
      </Router>
    )
  }
}


class OldSchoolMenuLink extends Component {
  constructor(props) {
    super(props);
    this.match = this.props.match;
    console.log(this.match);
    
  }
  render() {
    return (
      <Route path={this.props.to} exact={this.props.activeOnlyWhenExact} children={({ match }) => (
        <li className={match ? 'active' : ''}>
          {match ? '> ' : ''}<Link to={this.props.to}>{this.props.label}</Link>
        </li>
      )} />
    )
  }
}

export default CustomLinkExample
