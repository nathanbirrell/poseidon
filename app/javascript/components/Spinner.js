import React from 'react';
import PropTypes from 'prop-types';

class Spinner extends React.Component {
  render() {
    const styles = {
      textAlign: 'center',
      padding: '12px 0 12px 0',
    };
    let size = 38;

    if (this.props.isSmall) {
      size = 22;
    }

    return (
      <div className="spinner" style={styles}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg" stroke={this.props.fill}>
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" strokeWidth="2">
              <circle strokeOpacity=".1" cx="18" cy="18" r="18"/>
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="1s"
                  repeatCount="indefinite"/>
              </path>
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

Spinner.defaultProps = {
  fill: '#2278F1',
  isSmall: false,
};

Spinner.PropTypes = {
  fill: PropTypes.string,
  isSmall: PropTypes.bool,
};

export default Spinner;
