import React from 'react';
import logoImg from 'images/brand/LOGO_TEXT-BLUE-GRADIENT.svg';

/**
 * TODO:
 *    - add option for size
 *    - add option for color
 *    - add option for type
 */

export default () => {
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
};