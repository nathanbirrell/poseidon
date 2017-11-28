import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

export const iconContext = require.context("images/icons", true, /\.(png|jpg|svg)$/);

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
      return `./${this.props.name}-${this.props.color}.svg`;
    }

    return `./${this.props.name}.svg`;
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

    const styles = this.props.style ? this.props.style : {};

    if (this.props.rotate) {
      styles.transform = `rotate(${this.props.rotate}deg)`;
    }

    styles.backgroundImage = `url(${iconContext(this.getIconFileName())})`;

    return (
      <i className={classes} style={styles} />
    );
  }
}

Icon.defaultProps = {
  size: Size.SMALL,
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  rotate: PropTypes.number,
  size: PropTypes.oneOf(Object.values(Size)),
  color: PropTypes.string,
}

export default Icon;