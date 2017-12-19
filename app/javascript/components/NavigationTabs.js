import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Classnames from 'classnames';

class NavigationTabs extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fixed: false,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    if (!this.props.isBusy) {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillReceiveProps(nextProps) {
    const isBusyChanged = this.props.isBusy !== nextProps.isBusy;

    if (isBusyChanged && !nextProps.isBusy) {
      window.addEventListener('scroll', this.handleScroll);
    } else if (isBusyChanged && nextProps.isBusy) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  compomentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const yOffset = window.pageYOffset;
    const cutoff = 130;
    if (this.state.fixed) {
      if (yOffset < cutoff) {
        this.setState({
          fixed: false
        });
      }
    } else {
      if (yOffset >= cutoff) {
        this.setState({
          fixed: true
        });
      }
    }
  }

  renderTitleArea() {
    if (!this.props.titleArea) { return null; }

    return this.props.titleArea;
  }

  render() {
    if (!this.props.items) {
      return null;
    }

    const parentClasses = Classnames({
      'nav-tabs-container': true,
      '--fixed': this.state.fixed,
      '--with-title': this.props.titleArea,
    });
    const navTabClasses = Classnames({
      'nav-tabs': true,
    });

    return (
      <div className={parentClasses}>
        <div className="nav-tabs-spacer"></div>
        <div className={navTabClasses}>
          {this.renderTitleArea()}

          <div className="small-12 medium-5 cell">
            <div className="grid-x grid-padding-x">
              {this.props.items.map((item) => {
                const isSelected = item.link === window.location.pathname;
                // TODO: yarn add classnames, can't be having these conditionals
                return (
                  <Link
                    to={item.link}
                    key={item.link}
                    className={"small-3 medium-1 cell nav-tabs__item " + (isSelected ? '--focused' : '')}
                  >
                    <span className="nav-tabs__label">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NavigationTabs.defaultProps = {
  isBusy: false,
  titleArea: null,
}

NavigationTabs.propTypes = {
  items: PropTypes.array.isRequired,
  isBusy: PropTypes.bool,
  titleArea: PropTypes.node,
}

export default NavigationTabs;
