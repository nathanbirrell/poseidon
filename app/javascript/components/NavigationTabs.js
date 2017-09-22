import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class NavigationTabs extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fixed: false,
    };
  }

  render() {
    if (!this.props.items) {
      return null;
    }

    return (
      <div id="spot-toolbar" className={"row spot-toolbar " + (this.state.fixed ? '--fixed' : '')}>
        <div className="small-12 medium-5 columns">
          <div className="row">
            {this.props.items.map((item) => {
              const isSelected = item.link === window.location.pathname;
              // TODO: yarn add classnames, can't be having these conditionals
              return (
                <Link
                  to={item.link}
                  key={item.link}
                  className={"small-3 columns spot-toolbar__item " + (isSelected ? '--focused' : '')}
                >
                  <span className="spot-toolbar__label">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

NavigationTabs.defaultProps = {
  isBusy: false,
}

NavigationTabs.propTypes = {
  items: PropTypes.array.isRequired,
  isBusy: PropTypes.bool,
}

export default NavigationTabs;
