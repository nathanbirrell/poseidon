import React from 'react';
import PropTypes from 'prop-types';
import logoImg from 'images/brand/LOGO_TEXT-BLUE-GRADIENT.svg';

/**
 * TODO:
 *    - add option for size
 *    - add option for color
 *    - add option for type (WORK IN PROGRESS)
 */

const Type = Object.freeze({
  FULL: 'full',
  ICON: 'icon',
});

const Size = Object.freeze({
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

  render() {
    const styles = {
      width: 120,
      height: 'auto',
    };

    return (
      <img
        className="logo"
        src={logoImg}
        // title="Poseidon logo"
        alt="Poseidon logo"
        style={styles}
      />
    );
  }
}

Logo.defaultProps = {
  type: Type.FULL,
};

Logo.propTypes = {
  type: PropTypes.oneOf(Object.values(Type)),
};
