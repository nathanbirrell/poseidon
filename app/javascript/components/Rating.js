import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

class Rating extends React.Component {
  render() {
    if (!this.props.rating) { return null; }

    const classes = Classnames({
      'rating': true,
      '--large': this.props.isLarge,
    });
    const rating = Math.round(this.props.rating / 10);

    return (
      <div className={classes}>
        {rating}
      </div>
    );
  }
}

Rating.defaultProps = {
  rating: null,
  isLarge: false,
}

Rating.propTypes = {
  rating: PropTypes.number,
  isLarge: PropTypes.bool,
}

export default Rating;
