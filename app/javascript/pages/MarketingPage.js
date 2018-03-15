import React from 'react';

import Row from 'core/components/Row';
import Column from 'core/components/Column';
import Button from 'core/components/Button';
import Icon from 'core/components/Icon';
import Logo from 'core/components/Logo';

import heroImgBack from 'images/marketing/hero-mockup-back.png';
import heroImgFront from 'images/marketing/hero-mockup-front.png';
import sourcesImg from 'images/marketing/bom-noaa.png';

const MarketingPageNav = (props) => (
  <header role="banner" className="header">
    <nav className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li>
            <a href="/">
              {/* POSEIDON<sup>(BETA)</sup> */}
              <Logo />
            </a>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">
          <li><Button href="http://app.surfposeidon.io" type={Button.Type.LINK}>Sign In</Button></li>
          <li className="show-for-medium"><Button href="#join" type={Button.Type.LINK}>Get Access</Button></li>
        </ul>
      </div>
    </nav>
  </header>
);

const MailChimpSignup = (props) => (
  <div id="mc_embed_signup">
    <form action="https://surfposeidon.us16.list-manage.com/subscribe/post?u=20c962b030d8c109b48ebb56d&amp;id=ae99fea08b" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
      <Row id="mc_embed_signup_scroll" withXPadding={false}>
        <Column widthSmall={12} isAutoMediumUp className="mc-field-group">
          <label htmlFor="mce-EMAIL" className="show-for-sr">Email Address </label>
          <div className="input-holder --icon --icon-mail">
            <input type="email" value="" placeholder="Enter your email&hellip;" name="EMAIL" className="required email input" id="mce-EMAIL" type="text" />
          </div>
        </Column>
        <Column widthSmall={12} widthMedium={5}>
          <input type="submit" value="Get FREE Beta Access" name="subscribe" id="mc-embedded-subscribe" className="button --slim --secondary" />
        </Column>
        <div id="mce-responses" className="clear">
          <div className="response" id="mce-error-response" style={{ display: 'none' }} />
          <div className="response" id="mce-success-response" style={{ display: 'none' }} />
        </div>
        <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true"><input type="text" name="b_20c962b030d8c109b48ebb56d_ae99fea08b" tabIndex="-1" value="" /></div>
      </Row>
    </form>
  </div>
);

class MarketingPage extends React.Component {
  componentDidMount() {
    document.body.classList.add('marketing-page');
  }

  componentWillUnmount() {
    document.body.classList.remove('marketing-page');
  }

  render() {
    return (
      <div className="marketing-page__container">
        <MarketingPageNav />

        <Row className="callout callout--hero large">
          <Column isAutoMediumUp />
          <Column widthMedium={10} widthLarge={10}>
            <Row>
              <Column className="text-center" widthMedium={6}>
                <h1>Intelligent, reliable surf forecasting built for you.</h1>

                <p className="lead">
                  Surf like a god with simple spot recommendations, Australia's most trusted weather modelling and reports from local experts.
                </p>

                <Button href="#join">Get FREE Beta Access</Button>
              </Column>

              <Column style={{ display: 'flex', justifyContent: 'center' }} widthMedium={6}>
                <div className="hero-image-container parallax">
                  <div className="hero-image hero-image--back parallax__layer parallax__layer--back">
                    <span
                      style={{ backgroundImage: `url(${heroImgBack})` }}
                      className=""
                    />
                  </div>
                  <div className="hero-image hero-image--front parallax__layer parallax__layer--base">
                    <span
                      style={{ backgroundImage: `url(${heroImgFront})` }}
                      className=""
                    />
                  </div>
                </div>
              </Column>
            </Row>
          </Column>
          <Column isAutoMediumUp />
        </Row>

        <Row className="cvp-container" withYPadding withXPadding>
          <Column isAutoMediumUp />
          <Column widthMedium={10} widthLarge={10}>
            <Row style={{ padding: '22px 0' }}>
              <Column isAutoMediumUp>
                {/* <img className="" src="http://placehold.it/640x640?text=CVP+Image" /> */}

                <h3>Find sessions faster</h3>

                <p>Our <strong>forecast analysis</strong> finds you the best surf sessions at a glance, so you get more time surfing. </p>
              </Column>
              <Column isAutoMediumUp>
                {/* <img className="" src="http://placehold.it/640x640?text=CVP+Image" /> */}

                <h3>Share secret spots</h3>

                <p>Share <strong>local spots with your mates</strong> and get <strong>notifications</strong> when it&apos;s pumping.</p>

                {/* <ul className="list --icon">
                  <li><Icon name="check-square" size={Icon.Size.LARGE} /><b>mobile-first</b></li>
                  <li><Icon name="check-square" size={Icon.Size.LARGE} />local spot <b>notifications</b></li>
                  <li><Icon name="check-square" size={Icon.Size.LARGE} />private <b>secret spots</b> for you and your mates</li>
                </ul> */}
              </Column>
              <Column isAutoMediumUp>
                <h3>All in one place</h3>

                <p>Powered by <b>BOM</b> and the <b>NOAA</b>, you can now access all of surfing&apos;s most reliable sources in one place.</p>

                <img className="" src={sourcesImg} alt="BOM and NOAA's logos" />
              </Column>
            </Row>
          </Column>
          <Column isAutoMediumUp />
        </Row>

        <Row id="join" className="join callout large text-center">
          <Column isAutoMediumUp />
          <Column widthSmall={12} widthMedium={8} widthLarge={6}>
            <h2>Get FREE Beta Access</h2>
            <p className="lead">
              Surf like a God with simple spot recommendations, Australia&apos;s most trusted weather modelling and reports from local experts.
            </p>
            <p className="small">
              <small>
                The Early Access program is <i>invitation-only</i>.<br />
                Requests accepted until <b>30th of April 2018</b>.
              </small>
            </p>
            <MailChimpSignup />
          </Column>
          <Column isAutoMediumUp />
        </Row>

        <Row className="on-the-web text-center" withYPadding withXPadding>
          <Column isAutoMediumUp />
          <Column widthMedium={10} widthLarge={10}>
            <h2>Poseidon on the web</h2>
            <Row style={{ padding: '22px 0' }}>
              <Column isAutoMediumUp>
                <a href="https://instagram.com/surfposeidon">
                  <Icon name="instagram" />
                  <h3>Poseidon on Instagram</h3>
                </a>
                <p>For your daily dose.</p>
              </Column>
              <Column isAutoMediumUp>
                <a href="https://reddit.com/r/surfposeidon">
                  <Icon name="reddit" />
                  <h3>/r/surfposeidon on Reddit</h3>
                </a>
                <p>Have an idea? Join the community on Reddit.</p>
              </Column>
              <Column isAutoMediumUp>
                <a href="https://twitter.com/surfposeidon">
                  <Icon name="twitter" />
                  <h3>Poseidon on Twitter</h3>
                </a>
                <p>Have a question? Shoot us a tweet.</p>
              </Column>
            </Row>
          </Column>
          <Column isAutoMediumUp />
        </Row>
      </div>
    );
  }
}

export default MarketingPage;