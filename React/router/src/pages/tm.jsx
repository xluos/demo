import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class Basic extends Component {
  constructor (props) {
    super(props);
    this.match = this.props.match;
  }
  render() {
    return (
      <Router>
        <div>

        </div>
      </Router>
    );
  }
}

export default Basic;