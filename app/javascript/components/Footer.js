import React from 'react';
import Row from 'components/Row';
class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Row withXPadding withYPadding>
          <div className="medium-6 cell">
            <ul className="footer__links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Account</a></li>
              <li><a href="#">About</a></li>
            </ul>
          </div>

          <div className="medium-6 cell text-right">
            <p>
              Built with 🤙🏼  in Melbourne. <br />
              Copyright Surf Poseidon Pty Ltd 2017
            </p>
          </div>
        </Row>
      </footer>
    );
  }
}

export default Footer;