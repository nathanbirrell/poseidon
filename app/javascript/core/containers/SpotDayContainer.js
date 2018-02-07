import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';
import Column from 'components/Column';
import Spinner from 'components/Spinner';
import Button from 'components/Button';

class SpotDayContainer extends React.Component {
  render() {
    if (!this.props.forecasts) {
      return (
        <div id="current-section" className="row">
          <Spinner />
        </div>
      );
    }

    return (
      <Row id="today-section" className="text-center">
        <Column isAutoMediumUp />
        <Column widthMedium={5} widthLarge={5}>
          <h2 className="--small">{this.props.spot.name} surf reports coming soon</h2>

          <br /><br />

          <h3>Live near {this.props.spot.name}?</h3>

          <Button type={Button.Type.SECONDARY} href="http://eepurl.com/dbMF59">Become a Local Reporter</Button>
        </Column>
        <Column isAutoMediumUp />
      </Row>
    );
  }
}

SpotDayContainer.defaultProps = {
  forecasts: null,
};

SpotDayContainer.propTypes = {
  forecasts: PropTypes.object,
  spot: PropTypes.object.isRequired,
};

export default SpotDayContainer;
