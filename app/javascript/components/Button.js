import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import { Link } from 'react-router-dom';

const Type = Object.freeze({
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DARK: 'dark',
});

class Button extends React.PureComponent {
  static get Type() {
    return Type;
  }

  render() {
    const classes = Classnames({
      'btn': true,
      [`${this.props.className}`]: (this.props.className), // add any classes passed down
      '--secondary': (this.props.type === Type.SECONDARY),
      '--disabled': (this.props.disabled),
    });

    const attributes = {
      className: classes,
      tabIndex: this.props.tabIndex,
    };

    if (this.props.onClick) { attributes.onClick = this.props.onClick; }
    if (this.props.href) { attributes.href = this.props.href; }
    if (this.props.to) { attributes.to = this.props.to; }

    if (attributes.to) {
      return (
        <Link {...attributes}>
          {this.props.children || this.props.text}
        </Link>
      );
    }

    return (
      <button {...attributes} >
        {this.props.children || this.props.text}
      </button>
    );
  }
};

Button.defaultProps = {
  type: Type.PRIMARY,
};

Button.PropTypes = {
  type: PropTypes.oneOf(Object.values(Type)),
  children: PropTypes.node,
  className: PropTypes.string,
  text: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.function,
  href: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;