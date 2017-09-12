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
            {spot.name}
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