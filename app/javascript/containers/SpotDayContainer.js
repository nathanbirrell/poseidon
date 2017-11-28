import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import MathUtil from 'lib/MathUtil';
import SpotUtil from 'lib/SpotUtil';

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

    const current_swell = this.props.forecasts.swells[this.props.selectedTime];
    const current_wind = this.props.forecasts.winds[this.props.selectedTime];
    const current_tide =  this.props.forecasts.tides[this.props.selectedTime];

    return (
      <Row id="today-section">
        <Column>
          <h1>Verified Reports Coming Soon</h1>

          <Button type={Button.Type.SECONDARY} href="http://eepurl.com/dbMF59">Become a Verified Local Reporter</Button>
        </Column>
      </Row>
    );
  }
}

SpotDayContainer.defaultProps = {
  forecasts: null,
  selectedTime: null
};

SpotDayContainer.PropTypes = {
  forecasts: PropTypes.object,
  selectedTime: PropTypes.number
};

export default SpotDayContainer;
