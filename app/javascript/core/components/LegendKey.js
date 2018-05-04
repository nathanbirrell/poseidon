import React from 'react';
import PropTypes from 'prop-types';

class LegendKey extends React.Component {
  render() {
    return (
      <span style={{
        display: 'inline-block',
        height: this.props.isThin ? '2px' : '4px',
        width: '12px',
        marginBottom: this.props.isThin ? '5px' : '4px',
        borderRadius: '1px',
        backgroundColor: this.props.backgroundColor,
      }}
      />
    );
  }
}

LegendKey.defaultProps = {
  isThin: false,
};

LegendKey.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  isThin: PropTypes.bool,
};

export default LegendKey;