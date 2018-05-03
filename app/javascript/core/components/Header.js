import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'core/components/Icon';
import Button from 'core/components/Button';
import Logo from 'core/components/Logo';

class Header extends React.Component {
  render() {
    return (
      <header role="banner" className="header">
        <nav className="top-bar">
          <div className="top-bar-left">
            <ul className="menu">
              <li><Link to="/"><Logo type={Logo.Type.ICON} size={Logo.Size.XSMALL} /></Link></li>
              <li className="show-for-medium"><Link to="/">SESSIONS</Link></li>
              <li className="show-for-medium"><a className="disabled" aria-disabled="true" title="Coming soon">SPOTS</a></li>
              <li className="show-for-medium"><a className="disabled" aria-disabled="true" title="Coming soon">TRIPS</a></li>
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="menu">
              <li>
                <Button href="/users/sign_out" type={Button.Type.LINK}>
                  <Icon name="log-out" size={Icon.Size.MEDIUM} />
                  Sign out
                </Button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;