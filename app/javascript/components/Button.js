import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import { Link } from 'react-router-dom';

const Type = Object.freeze({
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DARK: 'dark',
  LINK: 'link',
});

class Button extends React.PureComponent {
  static get Type() {
    return Type;
  }

  render() {
    const classes = Classnames({
      'btn': (this.props.type !== Type.LINK),
      'link': (this.props.type === Type.LINK),
      [`${this.props.className}`]: (this.props.className), // add any classes passed down
      [`--${this.props.type}`]: (this.props.type !== Type.LINK),
      '--disabled': (this.props.disabled),
      '--slim': (this.props.isSlim), // TODO: make this a TYPE
    });

    const attributes = {
      className: classes,
      tabIndex: this.props.tabIndex,
    };

    // Optional attributes
    if (this.props.onClick) { attributes.onClick = this.props.onClick; }
    if (this.props.href) { attributes.href = this.props.href; }
    if (this.props.to) { attributes.to = this.props.to; }
    if (this.props.type) { attributes.type = this.props.type; }
    if (this.props.style) { attributes.style = this.props.style; }

    if (attributes.to) {
      return (
        <Link {...attributes}>
          <span className="btn__content">{this.props.children || this.props.text}</span>
        </Link>
      );
    }

    if (attributes.href) {
      return (
        <a {...attributes}>
          <span className="btn__content">{this.props.children || this.props.text}</span>
        </a>
      );
    }

    return (
      <button {...attributes} >
        <span className="btn__content">{this.props.children || this.props.text}</span>
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
  type: PropTypes.string,
  onClick: PropTypes.function,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  isSlim: PropTypes.bool,
  style: PropTypes.object,
};

export default Button;