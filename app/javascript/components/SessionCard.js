import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import String from 'string';
import Classnames from 'classnames';

import MathUtil from 'lib/MathUtil';
import SpotUtil from 'lib/SpotUtil';
import { Link } from 'react-router-dom';
import Row from 'components/Row';
import Column from 'components/Column';
import Rating from 'components/Rating';
import Indicator from 'components/Indicator';
import Icon from 'components/Icon';

const SessionCardCondition = (props) => {
  const classes = Classnames({
    'session-card__condition': true,
    '--highlighted': props.highlighted,
  });
  return (
    <div className={classes}>
      {props.label ? (<span className="session-card__label">{props.label}</span>) : null}
      <span className="session-card__condition-primary">
        {props.primary}
        {props.primaryUnit ? <span className="session-card__condition-primary-unit">{props.primaryUnit}</span> : null }
        <Indicator rating={props.primaryIndicator} />
      </span>
      <span className="session-card__condition-secondary">{props.secondary}</span>
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
    const isHighlighted = this.props.highlight === 'current_swell.rating' || this.props.highlight === 'current_swell.size';

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
        highlighted={isHighlighted}
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
    const isHighlighted = this.props.highlight === 'current_wind.rating' || this.props.highlight === 'current_wind.speed';

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
        highlighted={isHighlighted}
      />
    );
  }

  _renderTideConditions() {
    const { tide_current, tide_next } = this.props;
    const state = tide_current.state.toUpperCase();
    const height = MathUtil.round(tide_current.height, 1);
    const shiftRate = String(tide_current.shift_rate).capitalize().s;

    // TODO pass next tide in for expanded views
    const next_tide_type = this.props.isExpanded ? null : String(tide_next.tide_type).capitalize().s;
    const next_tide_height = this.props.isExpanded ? null : MathUtil.round(tide_next.height, 1);

    let stateIconRotate = 0;
    if (state === 'OUTGOING') { stateIconRotate = 180; }

    return (
      <SessionCardCondition
        label="Tide"
        primary={`${tide_current.height}`}
        primaryUnit={`m`}
        primaryIndicator={tide_current.rating}
        secondary={(
          <span>
            <Icon name="arrow-up" color="grey" rotate={stateIconRotate} />{state} <br />
            {this.props.isExpanded ? (<small>{shiftRate}</small>) : `${next_tide_type} ${moment(tide_next.date_time).fromNow()} (${next_tide_height}m)` }
          </span>
        )}
      />
    )
  }

  renderRating() {
    const current_rating = parseFloat(this.props.rating.rating);

    if (this.props.isExpanded) {
      return (
        <div className="session-card__rating">
          <Rating rating={current_rating} isLarge />
          <span className="session-card__label">OVERALL<br />POTENTIAL</span>
        </div>
      );
    }

    return (
      <div className="session-card__rating">
        <Rating rating={current_rating} />
      </div>
    )
  }

  renderNameAndRegion() {
    if (this.props.isExpanded) { return null; };

    return (
      <div className="session-card__name">
        <h3>{this.props.spot.name}</h3>
        <p>{this.props.spot.region.name}, {this.props.spot.region.state}</p>
      </div>
    );
  }

  renderBody() {
    const date_time = moment(this.props.rating.date_time).calendar();

    return (
      <div className="session-card__container">
        {this.renderRating()}
        {this.renderNameAndRegion()}
        <div className="session-card__updated">
          {date_time}
        </div>
        <div className="session-card__conditions">
          { this._renderSwellConditions() }
          { this._renderWindConditions() }
          { this._renderTideConditions() }
        </div>
      </div>
    );
  }

  render() {
    const classes = Classnames({
      'session-card': true,
      '--expanded': this.props.isExpanded,
    });

    if (this.props.isExpanded) {
      return (
        <Column widthMedium={6} className={classes}>
          {this.renderBody()}
        </Column>
      );
    }

    return (
      <div className={classes}>
        {this.renderBody()}
      </div>
    );
  }
}

SessionCard.defaultProps = {
  isExpanded: false,
  highlight: null,
};

SessionCard.propTypes = {
  rating: PropTypes.object.isRequired,
  swell: PropTypes.object.isRequired,
  wind: PropTypes.object.isRequired,
  tide_current: PropTypes.object.isRequired,
  tide_next: PropTypes.object,
  isExpanded: PropTypes.bool,
  highlight: PropTypes.string,
  spot: PropTypes.object,
}

export default SessionCard;