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

const Trigger = {
  CLICK: 'click',
  HOVER: 'hover',
  CLICK_AND_HOVER: 'tap-hover',
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
      visible: false,
      hasClicked: false, // true when type=CLICK_AND_HOVER and user clicks on the tooltip
    };

    this._toggleVisible = this._toggleVisible.bind(this);
    this._getTriggerAttributes = this._getTriggerAttributes.bind(this);
    this._show = this._show.bind(this);
    this._hide = this._hide.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._hideIfNotClicked = this._hideIfNotClicked.bind(this);
  }

  componentDidMount() {
    // TODO: bind some click event handlers here to check when user clicks away from tooltip, to close it!
  }

  _toggleVisible(visible = !this.state.visible) {
    this.setState({ visible });
  }

  _show() {
    this._toggleVisible(true);
  }

  _hide() {
    this._toggleVisible(false);
    this.setState({ hasClicked: false });
  }

  _hideIfNotClicked() {
    if (this.state.hasClicked) { return; }
    this._toggleVisible(false);
  }

  _getMouseoverAttributes() {
    return {
      onMouseEnter: this._show,
      onMouseOver: this._show,
      onMouseOut: this._hideIfNotClicked,
    };
  }

  _handleClick() {
    if (!this.state.hasClicked) {
      this._show();
      this.setState({ hasClicked: true });
    } else {
      this._hide();
    }
  }

  _getTriggerAttributes() {
    let triggerAttributes = {};

    switch (this.props.trigger) {
      case Trigger.CLICK:
        triggerAttributes.onClick = this._toggleVisible;
        break;

      case Trigger.HOVER:
        triggerAttributes = this._getMouseoverAttributes();
        break;

      case Trigger.CLICK_AND_HOVER:
      default:
        triggerAttributes = this._getMouseoverAttributes();
        triggerAttributes.onClick = this._handleClick;
        break;
    }

    return triggerAttributes;
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
      hide: !this.state.visible,
    });

    const triggerAttributes = this._getTriggerAttributes();
    const optionalAttributes = { ...triggerAttributes };

    return (
      <span
        data-tooltip
        aria-haspopup="true"
        className={linkClasses}

        // ref={(ref => { this.tooltipRef = ref; })}

        {...optionalAttributes}
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
  trigger: Trigger.CLICK_AND_HOVER,
  type: Type.LINK,
  side: Side.TOP,
};

Tooltip.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  message: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  type: PropTypes.oneOf(Object.values(Type)),
  side: PropTypes.oneOf(Object.values(Side)),
  trigger: PropTypes.oneOf(Object.values(Trigger)),
};

export default Tooltip;