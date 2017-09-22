import React from 'react';
import PropTypes from 'prop-types';

class PlaceholderShimmer extends React.Component {
  render() {
    if (!this.props.width || !this.props.height) {
      return null;
    }

    const dimensions = {
      width: this.props.width,
      height: this.props.height,
    }

    return (
      <div className='placeholder-shimmer' style={dimensions}></div>
    );
  }
}

PlaceholderShimmer.defaultProps = {
  width: null,
  height: null,
};

PlaceholderShimmer.PropTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export default PlaceholderShimmer;
