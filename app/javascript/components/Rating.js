import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

class Rating extends React.Component {
  render() {
    if (!this.props.rating) { return null; }

    const classes = Classnames({
      'rating': true,
      '--large': this.props.isLarge,
      '--small': this.props.isSmall, // shows x (default shows x/10)
    });
    const rating = Math.round(this.props.rating / 10);

    // Change rating background colour depending on rating. Uses custom math curves for Hue and Saturation to go between red-green
    const ratingStyles = {
      background: `hsl(${(Math.pow(rating, 2) + (7 * rating)) * 0.8},${(-1.8 * (Math.pow(rating, 2)) + (17 * rating) + 110) * 0.60}%,50%)`,
    };

    return (
      <div className={classes} style={ratingStyles}>
        {rating}
      </div>
    );
  }
}

Rating.defaultProps = {
  rating: null,
  isLarge: false,
  isSmall: false,
}

Rating.propTypes = {
  rating: PropTypes.number,
  isLarge: PropTypes.bool,
  isSmall: PropTypes.bool,
}

export default Rating;
