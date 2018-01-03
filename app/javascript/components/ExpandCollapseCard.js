import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

import Icon from 'components/Icon';

class ExpandCollapseCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
    };

    this.toggleExpanded = this.toggleExpanded.bind(this);
  }

  toggleExpanded() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  showCardContent() {
    return (this.state.isExpanded && this.props.isCollapseable) || !this.props.isCollapseable;
  }

  renderTitle() {
    const attributes = {};
    let iconStyles = {};
    let icon = null;

    attributes.className = 'card-title';

    if (this.props.isCollapseable) {
      attributes.onClick = this.toggleExpanded;

      if (this.state.isExpanded) {
        iconStyles.transform = `rotate(180deg)`;
      }

      icon = <Icon name="chevron-down" style={iconStyles} />;
    }

    return (
      <h5 {...attributes}>{this.props.title} {icon}</h5>
    );
  }

  render() {
    const classes = Classnames({
      'expand-collapse-card': true,
      '--collapsed': !this.showCardContent(),
      '--collapseable': this.props.isCollapseable,
      '--not-collapseable': !this.props.isCollapseable,
      [`${this.props.className}`]: !!this.props.className,
    });

    return (
      <div className={classes}>
        <div className="expand-collapse-card__top">
          {this.renderTitle()}
          {this.props.rightHandSide}
        </div>
        {this.showCardContent() ? this.props.children : null}
      </div>
    );
  }
};

ExpandCollapseCard.defaultProps = {
  className: null,
  isCollapseable: true,
  rightHandSide: null,
};

ExpandCollapseCard.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  rightHandSide: PropTypes.node,
  className: PropTypes.string,
  isCollapseable: PropTypes.bool,
};

export default ExpandCollapseCard;