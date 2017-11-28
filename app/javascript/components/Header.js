import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/Icon';

class Header extends React.Component {
  render() {
    return (
      <header role="banner" className="header">
        <nav className="top-bar">
          <div className="top-bar-left">
            <ul className="menu">
              <li><Link to="/">POSEIDON <sup>(BETA)</sup></Link></li>
              <li className="show-for-medium"><Link to="/">SPOTS</Link></li>
              <li className="show-for-medium"><Link to="/">MY SESSIONS</Link></li>
              <li className="show-for-medium"><Link to="/">THIS WEEK</Link></li>
              <li className="show-for-medium"><Link to="/">TRIPS</Link></li>
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="menu">
              <li><a href="/users/sign_out"><Icon name="log-out" size={Icon.Size.MEDIUM} style={{  marginBottom: '-2px' }} /> Sign Out</a></li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;