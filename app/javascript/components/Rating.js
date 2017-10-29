import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

import SpotUtil from 'lib/SpotUtil';

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
      background: SpotUtil.getRatingColor(rating),
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
