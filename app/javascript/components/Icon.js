import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

class Icon extends React.PureComponent {
  render() {
    const classes = Classnames({
      'icon': true,
      [`--icon-${this.props.name}`]: true
    });

    const styles = {};

    if (this.props.rotate) {
      // minus 180 because the icon file's default position is 180 degrees
      styles.transform = `rotate(${this.props.rotate - 180}deg)`
    }

    return (
      <i className={classes} style={styles} />
    );
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  rotate: PropTypes.number
}

export default Icon;