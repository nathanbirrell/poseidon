import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SpotsListTile extends React.Component {
  render() {
    const { spot } = this.props;
    const link = `/spots/${spot.id}`
    return (
      <div className="row">
        <Link to={link}>{spot.name}, {spot.region.name} = {spot.current_potential}</Link>
      </div>
    );
  }
}

SpotsListTile.propTypes = {
  spot: PropTypes.object,
}

export default SpotsListTile;