import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

const Size = Object.freeze({
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
});

class Icon extends React.PureComponent {
  static get Size() {
    return Size;
  }

  getIconFileName() {
    if (this.props.color) {
      return `${this.props.name}-${this.props.color}.svg`;
    }

    return `${this.props.name}.svg`;
  }

  getIconClassName() {
    if (this.props.color) {
      return `--icon-${this.props.name}-${this.props.color}`;
    }

    return `--icon-${this.props.name}`;
  }

  render() {
    const classes = Classnames({
      'icon': true,
      [this.getIconClassName()]: true,
      '--small': this.props.size === Size.SMALL,
      '--large': this.props.size === Size.LARGE,
    });

    const styles = {};

    if (this.props.rotate) {
      // minus 180 because the icon file's default position is 180 degrees
      styles.transform = `rotate(${this.props.rotate - 180}deg)`;
    }

    styles.backgroundImage = `url('${require('images/icons/' + this.getIconFileName())}')`;

    return (
      <i className={classes} style={styles} />
    );
  }
}

Icon.defaultProps = {
  size: Size.MEDIUM,
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  rotate: PropTypes.number,
  size: PropTypes.oneOf(Object.values(Size)),
  color: PropTypes.string,
}

export default Icon;