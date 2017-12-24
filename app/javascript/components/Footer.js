import React from 'react';
import Row from 'components/Row';
import { Link } from 'react-router-dom';

import Column from 'components/Column';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer cell">
        <Row withXPadding withYPadding>
          <Column widthMedium={10} offsetMedium={1}>
            <Row>
              <Column widthMedium={6}>
                <ul className="footer__links">
                  <li><Link to="/">Home</Link></li>
                  <li><a href="#">Account</a></li>
                  <li><a href="#">About</a></li>
                </ul>
              </Column>

              <Column widthMedium={6} className="footer__text">
                <p>
                  Built with stoke in Melbourne. <br />
                  Copyright Surf Poseidon Pty Ltd 2017
                </p>
              </Column>
            </Row>
          </Column>
        </Row>
      </footer>
    );
  }
}

export default Footer;