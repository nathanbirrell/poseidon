import React from 'react';

import Row from 'components/Row';
import Column from 'components/Column';

class HomePage extends React.Component {
  render() {
    return (
      <div className="marketing-page">
        <div className="callout large">
          <div className="row column text-center">
            <h1>Changing the World Through Design</h1>
            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
            <a href="#" className="button large">Learn More</a>
            <a href="#" className="button large hollow">Learn Less</a>
          </div>
        </div>
        <Row withYPadding>
          <Column isAutoMediumUp>
            <h3>Photoshop</h3>
            <p>Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna.</p>
          </Column>
          <Column isAutoMediumUp>
            <h3>Javascript</h3>
            <p>Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna.</p>
          </Column>
          <Column isAutoMediumUp>
            <h3>Marketing</h3>
            <p>Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna.</p>
          </Column>
        </Row>
      </div>
    );
  }
}

export default HomePage;