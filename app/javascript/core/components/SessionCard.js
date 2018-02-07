import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import String from 'string';
import Classnames from 'classnames';

import MathUtil from 'lib/MathUtil';
import SpotUtil from 'lib/SpotUtil';
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

SessionCardCondition.defaultProps = {
  highlighted: false,
};

SessionCardCondition.propTypes = {
  label: PropTypes.string.isRequired,
  primary: PropTypes.node.isRequired,
  secondary: PropTypes.node.isRequired,
  primaryUnit: PropTypes.string.isRequired,
  primaryIndicator: PropTypes.number.isRequired,
  highlighted: PropTypes.bool,
};

class SessionCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateTimeChanged: false,
    };

    this.renderDateTime = this.renderDateTime.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.rating.date_time !== nextProps.rating.date_time) {
      this._handleDateTimeChanged();
    }
  }

  _handleDateTimeChanged() {
    this.setState({ dateTimeChanged: true });
    // Highlight for 3 seconds
    setTimeout(
      () => { this.setState({ dateTimeChanged: false }); },
      3000,
    );
  }

  _renderSwellConditions() {
    const { swell } = this.props;
    const directionInWords = SpotUtil.degreesToText(swell.direction);
    const period = MathUtil.round(swell.period, 0);
    const size = MathUtil.round(SpotUtil.metresToFeet(swell.size), 1);
    const sizeInWords = String(SpotUtil.swellMetresToDescription(swell.size)).capitalize().s;
    const directionIconRotate = swell.direction - 180; // minus 180 because the icon file's default position is 180 degrees
    const isHighlighted = this.props.highlight === 'current_swell.rating' || this.props.highlight === 'current_swell.size';

    return (
      <SessionCardCondition
        label="Swell"
        primary={`${size}`}
        primaryUnit="ft"
        primaryIndicator={parseFloat(swell.rating)}
        secondary={(
          <span>
            <Icon name="navigation-2" rotate={directionIconRotate} size={Icon.Size.SMALL} color="grey" /> {directionInWords} @ {period}s <br />
            <small>{sizeInWords}</small>
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
        primaryIndicator={parseFloat(wind.rating)}
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
    const { tide_current } = this.props;
    const tide_next = tide_current.tide_after;
    const state = tide_current.state.toUpperCase();
    const height = MathUtil.round(tide_current.height, 1);
    let next_tide_text = moment(tide_next.date_time).fromNow();
    let shiftRate = `(${String(tide_current.shift_rate).capitalize().s})`;

    if (
      tide_current.shift_rate === 'medium' ||
      !this.props.isExpanded
    ) {
      // No need to explain normal/medium shift rates
      // Don't show for condensed session card
      shiftRate = null;
    }

    if (this.props.isExpanded) {
      next_tide_text = moment(tide_next.date_time).format('h:mma');
    }

    // TODO pass next tide in for expanded views
    const next_tide_type = String(tide_next.tide_type).toUpperCase().s;
    const next_tide_height = MathUtil.round(tide_next.height, 1);

    let stateIconRotate = 0;
    if (state === 'OUTGOING') { stateIconRotate = 180; }

    return (
      <SessionCardCondition
        label="Tide"
        primary={`${tide_current.height}`}
        primaryUnit="m"
        primaryIndicator={parseFloat(tide_current.rating)}
        secondary={(
          <span>
            <small><Icon name="arrow-up" color="grey" rotate={stateIconRotate} />{state} {shiftRate}</small><br />
            <small>{`${next_tide_type} ${next_tide_text} (${next_tide_height}m) ` }</small>
          </span>
        )}
      />
    );
  }

  renderRating() {
    const current_rating = parseFloat(this.props.rating.rating);

    if (this.props.isExpanded) {
      return (
        <div className="session-card__rating">
          <Rating rating={current_rating} isLarge />
          <span className="session-card__label --dark">OVERALL<br />POTENTIAL</span>
        </div>
      );
    }

    return (
      <div className="session-card__rating">
        <Rating rating={current_rating} />
      </div>
    );
  }

  renderNameAndRegion() {
    if (this.props.isExpanded) { return null; }

    return (
      <div className="session-card__name">
        <h3>{this.props.spot.name}</h3>
        <p>{this.props.spot.region.name}, {this.props.spot.region.state}</p>
      </div>
    );
  }

  renderDateTime() {
    const date_time = moment(this.props.rating.date_time).calendar();
    const classes = Classnames({
      'session-card__updated': true,
      '--highlighted': this.state.dateTimeChanged,
    });
    return (
      <div className={classes}>
        {date_time}
      </div>
    );
  }

  renderBody() {
    return (
      <div className="session-card__container">
        {this.renderRating()}
        {this.renderNameAndRegion()}
        {this.renderDateTime()}
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

    return (
      <div className={classes} id={this.props.id}>
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
  isExpanded: PropTypes.bool,
  highlight: PropTypes.string,
  spot: PropTypes.object,
  id: PropTypes.string,
};

export default SessionCard;