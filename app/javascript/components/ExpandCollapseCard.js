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

  render() {
    const classes = Classnames({
      'expand-collapse-card': true,
      '--expanded': this.state.isExpanded,
      [`${this.props.className}`]: !!this.props.className,
    });

    let icon = 'chevron-down';

    if (this.state.isExpanded) { icon = 'chevron-up'; }

    return (
      <div className={classes}>
        <h5 className="card-title" onClick={this.toggleExpanded}>{this.props.title} <Icon name={icon} /></h5>
        {this.props.children}
      </div>
    );
  }
};

ExpandCollapseCard.defaultProps = {
  className: null,
};

ExpandCollapseCard.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ExpandCollapseCard;