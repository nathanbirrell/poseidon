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
          <li><Button href="#join">Get FREE Beta Access</Button></li>
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
            <input type="submit" value="Get FREE Beta Access" name="subscribe" id="mc-embedded-subscribe" className="button --slim" />
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
                  Surf like a God with simple spot recommendations, Australia's most trusted weather modelling and reports from local experts.
                </p>

                <Button href="#join">Get FREE Beta Access</Button>
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
                <p>Powered by BOM and the NOAA, you can now access all of surfing&apos;s most reliable sources in one place. TODO ADD BOM/NOAA IMAGES FOR LEGITNESS</p>
              </Column>
              <Column isAutoMediumUp>
                <h3>Plan less, <br />surf more</h3>
                <p>Poseidon's <b>proprietary rating algorithm</b> tells you where&apos;s pumping, so you can forget about ideal swells, winds and tides and spend more time in the water.</p>
              </Column>
              <Column isAutoMediumUp>
                <h3>Built by surfers, for surfers</h3>
                <p>We know the many issues with existing services, so we&apos;re building <b>mobile-first</b>, spot <b>notifications</b> and private <b>secret spots</b> for you and your mates.</p>
              </Column>
            </Row>
          </Column>
          <Column isAutoMediumUp />
        </Row>

        <Row id="join" className="callout large text-center">
          <Column isAutoMediumUp />
          <Column widthSmall={12} widthMedium={8} widthLarge={6}>
            <h3>Get FREE Beta Access</h3>
            <p className="lead">
              Access to the Early Access program is <i>invitation-only</i>. Requests accepted until 31st of January 2018.
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