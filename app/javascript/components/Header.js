import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <header role="banner" className="header cell">
        <nav className="top-bar">
          <div className="top-bar-left">
            <ul className="menu">
              <li className="menu-text">POSEIDON <sup>(BETA)</sup></li>
              <li><Link to="/">SPOTS</Link></li>
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="menu">
              <li><a href="/users">ACCOUNT</a></li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;