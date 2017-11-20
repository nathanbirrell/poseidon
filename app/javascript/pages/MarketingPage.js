import React from 'react';

import Row from 'components/Row';
import Column from 'components/Column';
import Button from 'components/Button';

import heroImg from 'images/marketing/hero.png';

class HomePage extends React.Component {
  render() {
    console.log(heroImg);
    return (
      <div className="marketing-page">
        <Row className="callout large">
          <Column widthMedium={8}>
            <h1>Intelligent, reliable surf forecasting built for you.</h1>
            <p className="lead">
              Surf like a God with dead-simple surf forecasts, spot recommendations and Australia's most reliable weather modelling.
            </p>
            <Button>JOIN THE WAITLIST</Button>
          </Column>
          <div className="hero-image-container">
            <img className="hero-image" src={heroImg} />
          </div>
        </Row>
        <Row className="cvp-container" withYPadding withXPadding>
          <Column widthMedium={10} offsetMedium={1} widthLarge={10} offsetLarge={1}>
            <Row>
              <Column isAutoMediumUp>
                <h3>Australia's top modelling</h3>
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
        </Row>
      </div>
    );
  }
}

export default HomePage;