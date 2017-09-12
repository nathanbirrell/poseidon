import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import MathUtil from 'lib/MathUtil';
import SpotUtil from 'lib/SpotUtil';
import { Link } from 'react-router-dom';
import Row from 'components/Row';
import Column from 'components/Column';

const SpotTileCondition = (props) => {
  return (
    <div className="spot-tile__condition">
      <span className="spot-tile__condition-primary">
        {props.primary}
        {props.primaryUnit ? <span className="spot-tile__condition-primary-unit">{props.primaryUnit}</span> : null }
      </span>
      <span className="spot-tile__condition-secondary">{props.secondary}</span>
    </div>
  );
};

class SpotTile extends React.Component {
  render() {
    const { spot } = this.props;
    const link = `/spots/${spot.id}`;
    const updated_at = moment(spot.current_model_date_time).fromNow();
    const rating = parseFloat(spot.current_potential);
    const swell_size_ft = MathUtil.round(SpotUtil.metresToFeet(spot.current_swell.size), 1);
    const swell_direction = SpotUtil.degreesToText(spot.current_swell.direction);
    const swell_period = MathUtil.round(spot.current_swell.period, 0);
    const wind_direction = SpotUtil.degreesToText(spot.current_wind.direction);
    return (
      <Row>
        <Link to={link} className="spot-tile" >

          <div className="spot-tile__rating">
            {rating}
          </div>
          <div className="spot-tile__name">
            <h3>{spot.name}</h3>
            <p>{spot.region.name}, {spot.region.state}</p>
          </div>
          <div className="spot-tile__updated">
            {updated_at}
          </div>
          <div className="spot-tile__conditions">
            <SpotTileCondition
              primary={`${swell_size_ft}`}
              primaryUnit={'ft'}
              secondary={`${swell_direction} @ ${swell_period}s`}
            />
            <SpotTileCondition
              primary={`${wind_direction}`}
              secondary={`MODERATE TODO`}
            />
            <SpotTileCondition
              primary={`${spot.current_tide_snapshot.height}`}
              primaryUnit={`m`}
              secondary={`${spot.current_tide_snapshot.state} tide`}
            />
          </div>
        </Link>
      </Row>
    );
  }
}

SpotTile.propTypes = {
  spot: PropTypes.object,
}

export default SpotTile;