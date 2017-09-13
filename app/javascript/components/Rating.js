import React from 'react';
import PropTypes from 'prop-types';

class Rating extends React.Component {
  render() {
    if (!this.props.rating) { return null; }

    return (
      <div className="rating">
        {this.props.rating}
      </div>
    );
  }
}

Rating.defaultProps = {
  rating: null,
}

Rating.propTypes = {
  rating: PropTypes.number,
}

export default Rating;
