import React from 'react';
import PropTypes from 'prop-types';

import SpotUtil from 'spot-util.js';
import PlaceholderShimmer from './placeholder-shimmer';

class SpotBanner extends React.Component {
  render() {
    if (this.props.isBusy || !this.props.name) {
      return (
        <div className="spot-banner">
          <div className="row spot-banner__content">
            <div className="small-12 columns text-left">
              <div className="spot-banner__rating"></div>
              <div className="spot-banner__details">
                <PlaceholderShimmer width='220px' height='18px' />
                <PlaceholderShimmer width='100px' height='12px' />
              </div>
            </div>
          </div>
        </div>
      );
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
              <span><a href={`/regions/${this.props.region.id}`}>{this.props.region.name}</a>, {this.props.region.state}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SpotBanner.defaultProps = {
  isBusy: false,
  current_potential: null,
  name: null,
  region: null,
};

SpotBanner.PropTypes = {
  current_potential: PropTypes.string,
  name: PropTypes.string,
  region_name: PropTypes.object,
  isBusy: PropTypes.bool,
};

export default SpotBanner;
