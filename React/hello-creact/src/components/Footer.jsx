import React, { Component } from 'react';
import './Footer.css';
import Clock from './Clock.jsx';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        Footer
        <Clock />
        <Clock />
        <Clock />
        <Clock />
      </div>
    );
  }
}

export default Footer;
