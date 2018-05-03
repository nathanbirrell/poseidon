import React from 'react';
import PropTypes from 'prop-types';

const logosContext = require.context('images/brand/logo', true, /\.(png|svg)$/);

/**
 * TODO:
 *    - add option for size
 *    - add option for color
 *    - add option for type (WORK IN PROGRESS)
 */

const Type = Object.freeze({
  TEXT: 'TEXT',
  ICON: 'ONLY',
});

const Color = Object.freeze({
  BLUE_GRADIENT: 'BLUE-GRADIENT',
});

const Size = Object.freeze({
  XSMALL: 'xsmall',
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
});

export default class Logo extends React.Component {
  static get Size() {
    return Size;
  }

  static get Type() {
    return Type;
  }

  getSize() {
    console.log(this.props.size);
    switch (this.props.size) {
      case Size.XSMALL:
        return {
          width: 32,
          height: 'auto',
        };
      default:
        return {
          width: 120,
          height: 'auto',
        };
    }
  }

  logoImg() {
    let fileName = './LOGO';

    if (this.props.type) {
      fileName += `_${this.props.type}`;
    }

    if (this.props.color) {
      fileName += `-${this.props.color}`;
    }

    fileName += '.svg';

    return logosContext(fileName);
  }

  render() {
    const styles = {
      ...this.getSize(),
    };

    return (
      <img
        className="logo"
        src={this.logoImg()}
        // title="Poseidon logo"
        alt="Poseidon logo"
        style={styles}
      />
    );
  }
}

Logo.defaultProps = {
  type: Type.TEXT,
  color: Color.BLUE_GRADIENT,
  size: null,
};

Logo.propTypes = {
  type: PropTypes.oneOf(Object.values(Type)),
  color: PropTypes.oneOf(Object.values(Color)),
  size: PropTypes.oneOf(Object.values(Size)),
};
