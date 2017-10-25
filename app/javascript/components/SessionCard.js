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
import Icon from 'components/Icon';

const SessionCardCondition = (props) => {
  return (
    <div className={"spot-tile__condition"}>
      {props.label ? (<span className="spot-tile__label">{props.label}</span>) : null}
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
    const size_in_words = String(SpotUtil.swellMetresToDescription(swell.size)).capitalize().s;

    return (
      <SessionCardCondition
        label="Swell"
        primary={`${size}`}
        primaryUnit={'ft'}
        primaryIndicator={swell.rating}
        secondary={(
          <span>
            {direction} @ {period}s <br />
            <small>{size_in_words}</small>
          </span>
        )}
      />
    );
  }

  _renderWindConditions() {
    const { wind } = this.props;
    const direction = SpotUtil.degreesToText(wind.direction);
    const speed = MathUtil.round(SpotUtil.kphToKnots(wind.speed), 0);
    const speedInWords = SpotUtil.windKphToDescription(wind.speed).toUpperCase();
    const directionInWords = wind.direction_description;
    const windIconRotate = wind.direction - 180; // minus 180 because the icon file's default position is 180 degrees

    return (
      <SessionCardCondition
        label="Wind"
        primary={`${direction} ${speed}`}
        primaryUnit="kt"
        primaryIndicator={wind.rating}
        secondary={(
          <span>
            <Icon name="navigation-2" rotate={windIconRotate} size={Icon.Size.SMALL} color="grey" /> {speedInWords} <br />
            <small>{directionInWords}</small>
          </span>
        )}
      />
    );
  }

  _renderTideConditions() {
    const { tide } = this.props;
    const state = tide.state.toUpperCase();
    const height = MathUtil.round(tide.height, 1);
    const shiftRate = String(tide.shift_rate).capitalize().s;
    let stateIconRotate = 0;

    if (state === 'OUTGOING') { stateIconRotate = 180; }

    return (
      <SessionCardCondition
        label="Tide"
        primary={`${tide.height}`}
        primaryUnit={`m`}
        primaryIndicator={tide.rating}
        secondary={(
          <span>
            <Icon name="arrow-up" color="grey" rotate={stateIconRotate} />{state} <br />
            <small>{shiftRate}</small>
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
          <div className="spot-tile__rating">
            <Rating rating={current_rating} isLarge />
            <span className="spot-tile__label">OVERALL<br />POTENTIAL</span>
          </div>
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