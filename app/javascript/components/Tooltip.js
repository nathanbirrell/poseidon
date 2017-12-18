import React from 'react';
import PropTypes from 'prop-types';

import Classnames from 'classnames';

const Type = {
  LINK: 'link',
  HELP: 'help',
};

const Side = {
  TOP: 'top',
  LEFT: 'left',
  RIGHT: 'right',
};

class Tooltip extends React.PureComponent {
  static get Type() {
    return Type;
  }

  static get Side() {
    return Side;
  }

  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
    }

    this.toggleVisible = this.toggleVisible.bind(this);
  }

  componentDidMount() {
    // TODO: bind some click event handlers here to check when user clicks away from tooltip, to close it!
  }

  toggleVisible() {
    this.setState({ hidden: !this.state.hidden });
  }

  render() {
    const linkClasses = Classnames({
      'has-tip': true,
      top: true,
      [`--${this.props.type}`]: true,
    });

    const tooltipClasses = Classnames({
      tooltip: true,
      [`${this.props.side}`]: !!this.props.side,
      'align-center': true,
      hide: this.state.hidden,
    });

    return (
      <span
        data-tooltip
        aria-haspopup="true"
        className={linkClasses}
        onClick={this.toggleVisible}
        ref={(ref => { this.tooltipRef = ref; })}
      >
        {this.props.children}

        <span className={tooltipClasses}>
          {this.props.message}
        </span>
      </span>
    );
  }
}

Tooltip.defaultProps = {
  type: Type.LINK,
  side: Side.TOP,
};

Tooltip.PropTypes = {
  children: PropTypes.oneOf([PropTypes.node, PropTypes.string]).isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(Type)),
  side: PropTypes.oneOf(Object.values(Side)),
};

export default Tooltip;