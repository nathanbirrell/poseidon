import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <header role="banner" className="header">
        <nav className="top-bar">
          <div className="top-bar-left">
            <ul className="menu">
              <li><Link to="/">POSEIDON <sup>(BETA)</sup></Link></li>
              <li><Link to="/">SPOTS</Link></li>
              <li><Link to="/">MY SESSIONS</Link></li>
              <li><Link to="/">THIS WEEK</Link></li>
              <li><Link to="/">TRIPS</Link></li>
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