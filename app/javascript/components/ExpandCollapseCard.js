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
    let icon = null;

    attributes.className = 'card-title';

    if (this.props.isCollapseable) {
      attributes.onClick = this.toggleExpanded;

      icon = <Icon name="chevron-down" />;
      if (this.state.isExpanded) { icon = <Icon name="chevron-up" />; }
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
      [`${this.props.className}`]: !!this.props.className,
    });

    return (
      <div className={classes}>
        {this.renderTitle()}
        {this.showCardContent() ? this.props.children : null}
      </div>
    );
  }
};

ExpandCollapseCard.defaultProps = {
  className: null,
  isCollapseable: true,
};

ExpandCollapseCard.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  isCollapseable: PropTypes.bool,
};

export default ExpandCollapseCard;