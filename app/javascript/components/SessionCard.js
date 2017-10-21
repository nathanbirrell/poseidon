import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import String from 'string';

import MathUtil from 'lib/MathUtil';
import SpotUtil from 'lib/SpotUtil';
import { Link } from 'react-router-dom';
import Row from 'components/Row';
import Column from 'components/Column';
import Rating from 'components/Rating';
import Indicator from 'components/Indicator';

const SessionCardCondition = (props) => {
  return (
    <div className={"spot-tile__condition"}>
      {props.label ? (<span className="spot-tile__condition-label">{props.label}</span>) : null}
      <span className="spot-tile__condition-primary">
        {props.primary}
        {props.primaryUnit ? <span className="spot-tile__condition-primary-unit">{props.primaryUnit}</span> : null }
        <Indicator rating={props.primaryIndicator} />
      </span>
      <span className="spot-tile__condition-secondary">{props.secondary}</span>
    </div>
  );
};

class SessionCard extends React.PureComponent {
  _renderSwellConditions() {
    const { swell } = this.props;
    const direction = SpotUtil.degreesToText(swell.direction);
    const period = MathUtil.round(swell.period, 0);
    const size = MathUtil.round(SpotUtil.metresToFeet(swell.size), 1);
    const size_in_words = SpotUtil.swellMetresToDescription(swell.size);

    return (
      <SessionCardCondition
        label="Swell"
        primary={`${size}`}
        primaryUnit={'ft'}
        primaryIndicator={swell.rating}
        secondary={(
          <span>
            {direction} @ {period}s <br />
            {size_in_words}
          </span>
        )}
      />
    );
  }

  _renderWindConditions() {
    const { wind } = this.props;
    const direction = SpotUtil.degreesToText(wind.direction);
    const speed = MathUtil.round(SpotUtil.kphToKnots(wind.speed), 0);
    const speed_in_words = SpotUtil.windKphToDescription(wind.speed);
    const direction_in_words = SpotUtil.windDirectionRatingToDescription(wind.direction_rating);

    return (
      <SessionCardCondition
        label="Wind"
        primary={`${speed} ${direction}`}
        primaryUnit="kt"
        primaryIndicator={wind.rating}
        secondary={(
          <span>
            {speed_in_words} {direction_in_words}
          </span>
        )}
      />
    );
  }

  _renderTideConditions() {
    const { tide } = this.props;
    console.log(tide);
    const state = String(tide.state).capitalize().s;
    const height = MathUtil.round(tide.height, 1);

    return (
      <SessionCardCondition
        label="Tide"
        primary={`${tide.height}`}
        primaryUnit={`m`}
        primaryIndicator={tide.rating}
        secondary={(
          <span>
            {`${state}`} <br />
          </span>
        )}
      />
    )
  }

  render() {
    const { rating } = this.props;
    const date_time = moment(rating.date_time).calendar();
    const current_rating = parseFloat(rating.rating);

    return (
      <Column widthMedium={6} className="spot-tile --expanded">
        <div className="spot-tile__container">
          <div className="spot-tile__updated">
            {date_time}
          </div>
          <div className="spot-tile__conditions">
            { this._renderSwellConditions() }
            { this._renderWindConditions() }
            { this._renderTideConditions() }
          </div>
        </div>
      </Column>
    );
  }
}

SessionCard.defaultProps = {
};

SessionCard.propTypes = {
  rating: PropTypes.object,
  swell: PropTypes.object,
  wind: PropTypes.object,
  tide: PropTypes.object,
}

export default SessionCard;