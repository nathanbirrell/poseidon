import React from 'react';
import PropTypes from 'prop-types';
import SpotUtil from 'lib/SpotUtil';

class Indicator extends React.PureComponent {
  render() {
    const rating = Math.round(this.props.rating / 10);

    return (
      <span className="indicator" style={{ background: SpotUtil.getRatingColor(rating) }} />
    );
  }
};

Indicator.defaultProps = {
  rating: 0,
};

Indicator.propTypes = {
  rating: PropTypes.number,
};

export default Indicator;