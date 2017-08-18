import React from 'react';
import PropTypes from 'prop-types';

import SpotUtil from 'spot-util.js';

class SpotBanner extends React.Component {
  render() {
    if (!this.props.current_potential) {
      return null;
    }

    return (
      <div className={`spot-banner --${SpotUtil.getVerdict(this.props.current_potential)}`}>
        <div className="row spot-banner__content">
          <div className="small-12 columns text-left">
            <div className="spot-banner__rating">
              <span>{this.props.current_potential}</span>
              <span className="percent">%</span>
            </div>
            <div className="spot-banner__details">
              <h2>{this.props.name}</h2>
              <span>{this.props.region_name}, {this.props.region_state}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SpotBanner.defaultProps = {
  current_potential: null,
  name: null,
  region_name: null,
  region_state: null,
};

SpotBanner.PropTypes = {
  current_potential: PropTypes.string,
  name: PropTypes.string,
  region_name: PropTypes.string,
  region_state: PropTypes.string,
};

export default SpotBanner;
