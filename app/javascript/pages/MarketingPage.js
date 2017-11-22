import React from 'react';

import Row from 'components/Row';
import Column from 'components/Column';
import Button from 'components/Button';

import heroImg from 'images/marketing/hero.png';

const MarketingPageNav = (props) => (
  <header role="banner" className="header">
    <nav className="top-bar">
      <div className="top-bar-left">
        <ul className="menu"><li><a href="/">POSEIDON<sup>(BETA)</sup></a></li></ul>
      </div>
      <div className="top-bar-right show-for-medium">
        <ul className="menu">
          <li><a href="http://app.surfposeidon.io" style={{fontWeight: '400'}}>Sign In</a></li>
          <li><Button href="#join">Join the Waitlist</Button></li>
        </ul>
      </div>
    </nav>
  </header>
);

const MailChimpSignup = (props) => (
  <div id="mc_embed_signup">
    <form action="https://surfposeidon.us16.list-manage.com/subscribe/post?u=20c962b030d8c109b48ebb56d&amp;id=ae99fea08b" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
        <Row id="mc_embed_signup_scroll" withXPadding={false}>
          <Column widthSmall={12} widthMedium={8} className="mc-field-group">
            <label htmlFor="mce-EMAIL" className="show-for-sr">Email Address </label>
            <div className="input-holder --icon --icon-mail">
              <input type="email" value="" placeholder="Enter your email&hellip;" name="EMAIL" className="required email" id="mce-EMAIL" type="text" />
            </div>
          </Column>
          <Column widthSmall={12} widthMedium={4}>
            <input type="submit" value="FREE beta access" name="subscribe" id="mc-embedded-subscribe" className="button --slim" />
          </Column>
          <div id="mce-responses" className="clear">
            <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
            <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
          </div>
          <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true"><input type="text" name="b_20c962b030d8c109b48ebb56d_ae99fea08b" tabIndex="-1" value="" /></div>
        </Row>
    </form>
  </div>
);

class MarketingPage extends React.Component {
  render() {
    console.log(heroImg);
    return (
      <div className="marketing-page">
        <MarketingPageNav />

        <Row className="callout --hero large">
          <Column isAutoMediumUp />
          <Column widthMedium={10} widthLarge={10}>
            <Row>
              <Column widthMedium={7}>
                <h1>Intelligent, reliable surf forecasting built for you.</h1>
                <p className="lead">
                  Surf like a God with simple surf forecasts, spot recommendations and Australia's most reliable weather modelling.
                </p>
                <Button href="#join">JOIN THE WAITLIST</Button>
              </Column>
            </Row>
          </Column>
          <Column isAutoMediumUp>
            <Column className="hero-image-container">
              <img className="hero-image" src={heroImg} />
            </Column>
          </Column>
        </Row>

        <Row className="cvp-container" withYPadding withXPadding>
          <Column isAutoMediumUp />
          <Column widthMedium={10} widthLarge={10}>
            <Row>
              <Column isAutoMediumUp>
                <h3>Australia's top weather models</h3>
                <p>Powered by BOM and the NOAA, you can now access all of surfing's most reliable sources in one place. TODO ADD BOM/NOAA IMAGES FOR LEGITNESS</p>
              </Column>
              <Column isAutoMediumUp>
                <h3>Plan less, <br />surf more</h3>
                <p>Poseidon's proprietary rating algorithm tells you where's pumping, so you can forget about ideal swells, winds and tides and spend more time in the water.</p>
              </Column>
              <Column isAutoMediumUp>
                <h3>Mobile first, notifications m8</h3>
                <p>Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna.</p>
              </Column>
            </Row>
          </Column>
          <Column isAutoMediumUp />
        </Row>

        <Row id="join" className="callout large text-center">
          <Column isAutoMediumUp />
          <Column widthSmall={12} widthMedium={8} widthLarge={6}>
            <h3>Join the waitlist</h3>
            <p className="">
              While in beta, we&apos;re looking for people to test the app and provide feedback.
            </p>
            <MailChimpSignup />
          </Column>
          <Column isAutoMediumUp />
        </Row>
      </div>
    );
  }
}

export default MarketingPage;