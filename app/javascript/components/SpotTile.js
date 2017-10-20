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

const SpotTileCondition = (props) => {
  return (
    <div className={"spot-tile__condition " + (props.highlighted ? "--highlighted" : "")}>
      <span className="spot-tile__condition-primary">
        {props.primary}
        {props.primaryUnit ? <span className="spot-tile__condition-primary-unit">{props.primaryUnit}</span> : null }
        <Indicator rating={props.primaryIndicator} />
      </span>
      <span className="spot-tile__condition-secondary">{props.secondary}</span>
    </div>
  );
};

class SpotTile extends React.Component {
  _renderSwellConditions() {
    const { current_swell } = this.props.spot;
    const swell_direction = SpotUtil.degreesToText(current_swell.direction);
    const swell_period = MathUtil.round(current_swell.period, 0);
    const swell_size_ft = MathUtil.round(SpotUtil.metresToFeet(current_swell.size), 1);
    const swell_size_in_words = SpotUtil.swellMetresToDescription(current_swell.size);
    const isHighlighted = this.props.highlight === 'current_swell.rating' || this.props.highlight === 'current_swell.size';

    return (
      <SpotTileCondition
        primary={`${swell_size_ft}`}
        primaryUnit={'ft'}
        primaryIndicator={current_swell.rating}
        secondary={(
          <span>
            {swell_direction} @ {swell_period}s <br />
            {swell_size_in_words}
          </span>
        )}
        highlighted={isHighlighted}
      />
    );
  }

  _renderWindConditions() {
    const { current_wind } = this.props.spot;
    const wind_direction = SpotUtil.degreesToText(current_wind.direction);
    const wind_speed = MathUtil.round(SpotUtil.kphToKnots(current_wind.speed), 0);
    const wind_speed_in_words = SpotUtil.windKphToDescription(current_wind.speed);
    const isHighlighted = this.props.highlight === 'current_wind.rating' || this.props.highlight === 'current_wind.speed';

    return (
      <SpotTileCondition
        primary={`${wind_direction}`}
        primaryIndicator={current_wind.rating}
        secondary={(
          <span>
            {wind_speed_in_words} <br />
            {wind_speed}kts, onshore
          </span>
        )}
        highlighted={isHighlighted}
      />
    );
  }

  _renderTideConditions() {
    const { current_tide_snapshot, next_tide } = this.props.spot;
    const current_tide_state = String(current_tide_snapshot.state).capitalize().s;
    const next_tide_type = String(next_tide.tide_type).capitalize().s;
    const next_tide_height = MathUtil.round(next_tide.height, 1);

    return (
      <SpotTileCondition
        primary={`${current_tide_snapshot.height}`}
        primaryUnit={`m`}
        primaryIndicator={current_tide_snapshot.rating}
        secondary={(
          <span>
            {`${current_tide_state}`} <br />
            {`${next_tide_type} ${moment(next_tide.date_time).fromNow()} (${next_tide_height}m)`}
          </span>
        )}
      />
    )
  }

  render() {
    const { spot } = this.props;
    const link = `/spots/${spot.id}/forecast`;
    const updated_at = moment(spot.current_model_date_time).fromNow();
    const rating = parseFloat(spot.current_potential);

    return (
      <Column widthMedium={6} className="spot-tile">
        <Link to={link} >
          <div className="spot-tile__rating">
            <Rating rating={rating} />
          </div>
          <div className="spot-tile__name">
            <h3>{spot.name}</h3>
            <p>{spot.region.name}, {spot.region.state}</p>
          </div>
          <div className="spot-tile__updated">
            {updated_at}
          </div>
          <div className="spot-tile__conditions">
            { this._renderSwellConditions() }

            { this._renderWindConditions() }

            { this._renderTideConditions() }
          </div>
        </Link>
      </Column>
    );
  }
}

SpotTile.defaultProps = {
  highlight: null,
};

SpotTile.propTypes = {
  spot: PropTypes.object.isRequired,
  highlight: PropTypes.string,
}

export default SpotTile;