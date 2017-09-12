import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import SpotUtil from 'lib/SpotUtil'
import { Link } from 'react-router-dom';
import Row from 'components/Row';
import Column from 'components/Column';

class SpotTile extends React.Component {
  render() {
    const { spot } = this.props;
    const link = `/spots/${spot.id}`;
    return (
      <Row>
        <Column className="spot-tile">
          <Link to={link} >

            <div className="spot-tile__rating">
              {spot.current_potential}
            </div>
            <div className="spot-tile__body">
              {spot.name}
              {spot.region.name}
              {spot.current_swell.size}
              {spot.current_swell.direction}
              {spot.current_swell.period}
              {spot.current_wind.direction}
              {spot.current_tide_snapshot.type} tide
              {spot.current_tide_snapshot.height}
            </div>
            <div className="spot-tile__updated">
              UPDATED {spot.current_model_date_time}
            </div>
          </Link>
        </Column>
      </Row>
    );
  }
}

SpotTile.propTypes = {
  spot: PropTypes.object,
}

export default SpotTile;